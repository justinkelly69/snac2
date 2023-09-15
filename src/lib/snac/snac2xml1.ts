import React from 'react';

import {
    SNAC2XMLJSXFuncs1, SNACItem, SNACElement, SNACText,
    SNACCDATA, SNACComment, SNACPINode, SNAC2XMLOpts
} from './types'

import {
    escapeHtml, escapeCDATA, escapeComment, escapePIBody,
} from './utils'

const render = <T>(snac: SNACItem[], funcs: SNAC2XMLJSXFuncs1<T>, opts: SNAC2XMLOpts): T[] => {
    return _render(snac, [], funcs, opts)
}

const _render = <T>(snac: SNACItem[], path: number[], funcs: SNAC2XMLJSXFuncs1<T>, opts: SNAC2XMLOpts): T[] => {
    let out: T[] = []

    for (let i in Object.keys(snac)) {
        const index = parseInt(i)

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement

            out = [...out, funcs.Tag({
                key: index,
                path: [...path, index],
                element: snacElementNode,
                childFunction: () => _render(snacElementNode["C"], path, funcs, opts)
            })]
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.trimText) {
                text = text.trim()
            }
            out = [...out, funcs.Text({
                key: index,
                path: path,
                text: text,
            })]
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out = [...out, funcs.CDATA({
                key: index,
                path: path,
                cdata: escapeCDATA(snacCDATANode["D"])
            })]
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out = [...out, funcs.Comment({
                    key: index,
                    path: path,
                    comment: escapeComment(snacCommentNode["M"])
                })]
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out = [...out, funcs.PI({
                    key: index,
                    path: path,
                    lang: snacPINode["L"],
                    body: escapePIBody(snacPINode["B"])
                })]
            }
        }
    }

    return out
}

export default render
