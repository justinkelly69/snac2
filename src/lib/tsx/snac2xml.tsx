import React from 'react';

import {
    SNAC2XMLOutFuncs, SNACItem, SNACElement,
    SNACText, SNACCDATA, SNACComment, SNACPINode,
    SNAC2XMLOpts,
} from '../snac/types'

import {
    escapeHtml, escapeCDATA, escapeComment,
    escapePIBody,
} from '../snac/utils'

const snac2xml = (snac: SNACItem[], funcs: SNAC2XMLOutFuncs, opts: SNAC2XMLOpts) => {
    return _snac2xml(snac, [], funcs, opts)
}

const _snac2xml = (snac: SNACItem[], path: number[], funcs: SNAC2XMLOutFuncs, opts: SNAC2XMLOpts) => {
    const { OpenTag, CloseTag, EmptyTag, Text, CDATA, Comment, Pi, Attribute, Prefix } = funcs
    let out: JSX.Element[] = []

    for (let i in Object.keys(snac)) {
        const newPath = [...path, parseInt(i)]

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;

            const children = _snac2xml(snacElementNode["C"], newPath, funcs, opts)
            console.log(JSON.stringify(snacElementNode["C"], null, 4))
            
            if (children.length === 0 && opts.selfCloseTags) {
                out = [...out,(
                    <EmptyTag
                        path={path}
                        name={snacElementNode["N"]}
                        attributes={snacElementNode["A"]}
                    />
                )] 
            }
            else {
                out = [...out, (
                    <>
                        <OpenTag
                            path={path}
                            name={snacElementNode["N"]}
                            attributes={snacElementNode["A"]}
                        />
                        {children}
                        <CloseTag
                            path={path}
                            name={snacElementNode["N"]}
                        />
                    </>
                )]
            }
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.trimText) {
                text = text.trim()
            }
            out = [...out, (<Text path={path} text={text} />)]
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out = [...out, (
                <CDATA path={path} cdata={escapeCDATA(snacCDATANode["D"])} />
            )]
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out = [...out, (
                    <Comment path={path} comment={escapeComment(snacCommentNode["M"])} />
                )]
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out = [...out, (
                    <Pi path={path} lang={snacPINode["L"]} body={escapePIBody(snacPINode["B"])} />
                )]
            }
        }
    }

    return out
}

export default snac2xml
