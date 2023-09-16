import React from 'react';

import {
    SNACItem, SNACElement, SNACText,
    SNACCDATA, SNACComment, SNACPINode, SNAC2XMLOpts
} from './types'

import {
    escapeHtml, escapeCDATA, escapeComment, escapePIBody,
} from './utils'

export interface ITag<E, T, D, M, P> {

    newTag: (
        key: number,
        path: number[],
        element: SNACElement,
        children: Array<E | T | D | M | P>,
    ) => E,

    newText: (
        key: number,
        path: number[],
        text: string,
    ) => T,

    newCDATA: (
        key: number,
        path: number[],
        cdata: string,
    ) => D,

    newComment: (
        key: number,
        path: number[],
        comment: string,
    ) => M,

    newPI: (
        key: number,
        path: number[],
        lang: string,
        body: string,
    ) => P,
}


const render = <E, T, D, M, P>(snac: SNACItem[], funcs: ITag<E, T, D, M, P>, opts: SNAC2XMLOpts): Array<E | T | D | M | P> => {
    return _render(snac, [], funcs, opts)
}

const _render = <E, T, D, M, P>(snac: SNACItem[], path: number[], funcs: ITag<E, T, D, M, P>, opts: SNAC2XMLOpts): Array<E | T | D | M | P> => {
    const out: Array<E | T | D | M | P> = []

    for (let i in Object.keys(snac)) {
        const index = parseInt(i)

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement
            out.push(funcs.newTag(index, [...path, index], snacElementNode, _render(snacElementNode["C"], path, funcs, opts)))
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.trimText) {
                text = text.trim()
            }
            out.push(funcs.newText(index, path, text))
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out.push(funcs.newCDATA(index, path, escapeCDATA(snacCDATANode["D"])))
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out.push(funcs.newComment(index, path, escapeComment(snacCommentNode["M"])))
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out.push(funcs.newPI(index, path, snacPINode["L"], escapePIBody(snacPINode["B"])))
            }
        }
    }

    return out
}

export default render
