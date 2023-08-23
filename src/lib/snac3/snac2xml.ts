import processSNAC from "./snac2"
import snac from '../data/snac/waffle'
import { PrefixOptions, SNACItem, XMLOptions } from "./types"
//import { getPrefix } from "./snac2xml1"



const xml2 = processSNAC(snac as SNACItem[], {

    prefixOptions: {
        showPrefix: false,
        newline: "\n",
        usePrefix: true,
        prefixStart: "",
        prefixCharacter: "\t",
        attributePrefix: "  "
    },

    xmlOptions: {
        selfCloseTags: false,
        trimText: true,
    },

    openTag: (out: string, path: number[], elementName: string, attrs: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}<${elementName}${attrs}>`
    },

    children: (out: string, children: string) => {
        return `${out}${children}`
    },

    closeTag: (out: string, path: number[], elementName: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}</${elementName}>`
    },

    emptyTag: (out: string, prefix: string, elementName: string, attrs: string) => {
        return `${out}${prefix}<${elementName}${attrs} />`
    },

    text: (out: string, path: number[], text: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}${text}`
    },

    cdata: (out: string, path: number[], cdata: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}<![CDATA[${cdata}]]>`
    },
 
    comment: (out: string, path: number[], comment: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}<!--${comment}-->`
    },

    pi: (out: string, path: number[], lang: string, body: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, false)}<?${lang} ${body}?>`
    },

    attribute: (out: string, path: number[], name: string, value: string, prefixOptions: PrefixOptions, getPrefix: Function) => {
        return `${out}${getPrefix(path, prefixOptions, true)}${name}="${value}"`
    }
})

console.log(xml2)
