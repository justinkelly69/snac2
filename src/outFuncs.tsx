import React from 'react'

import { AttributesType, PrefixOpts, SNACElement, SNACItem } from './lib/snac/types'
import { ITag } from './lib/snac/snac2xml'

export const prefixOpts = {
    showPrefix: true,
    newLine: "\n",
    usePrefix: true,
    startChar: ">",
    charOn: "    ",
    charOff: "    ",
    attributePrefix: "  ",
}

export const xmlOpts = {
    selfCloseTags: true,
    trimText: true,
    allowComments: true,
    allowPIs: true,
}

export const getPrefix = (path: number[]):string => {
    let out:string = ""
    for(const p of path){
        out += "    "
    }
    return out
}

const iTag: ITag<string, string, string, string, string> = {

    newTag: function(
        key: number,
        path: number[],
        element: SNACElement,
        children: Array<SNACItem>,
    ) {
        const prefix = getPrefix(path)
        const name = element.N
        const attributes = element.A

        let tag = `\n${prefix}<${name} `
        for(const a in attributes) {
            tag += `\n${prefix}  ${a}="${attributes[a]}"`
        }
        
        for(const c in children) {
            if(children[c].hasOwnProperty("N")){
                tag += this.newTag(key, path, children[c], child.C)
            }
        }

    },

    newText: (
        key: number,
        path: number[],
        text: string,
    ) => {
        const prefix = getPrefix(path)
        return `\n${prefix}${text}`
    },

    newCDATA: (
        key: number,
        path: number[],
        cdata: string,
    ) => {
        const prefix = getPrefix(path)
        return `\n${prefix}<![CDATA[${cdata}]]>`
    },

    newComment: (
        key: number,
        path: number[],
        comment: string,
    ) => {
        const prefix = getPrefix(path)
        return `\n${prefix}<!--${comment}-->`
    },

    newPI: (
        key: number,
        path: number[],
        lang: string,
        body: string,
    ) => {
        const prefix = getPrefix(path)
        return `\n${prefix}<?${lang} ${body}?>`
    }
}

