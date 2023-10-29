import React, { Fragment } from 'react';

import {
    SNAC2XMLJSXFuncs, SNACItem, SNACElement, SNACText,
    SNACCDATA, SNACComment, SNACPINode, SNAC2XMLOpts,
} from '../snac/types'

import {
    escapeHtml, escapeCDATA, escapeComment, escapePIBody,
} from '../snac/utils'

const snac2xml = (snac: SNACItem[], funcs: SNAC2XMLJSXFuncs, opts: SNAC2XMLOpts) => {
    return _snac2xml(snac, [], funcs, opts)
}

const _snac2xml = (snac: SNACItem[], path: number[], funcs: SNAC2XMLJSXFuncs, opts: SNAC2XMLOpts) => {
    const { OpenTag, CloseTag, Text, CDATA, Comment, PI } = funcs
    let out: JSX.Element[] = []

    for (let i in Object.keys(snac)) {
        const newPath = [...path, parseInt(i)]

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;
            if (snacElementNode["C"].length === 0 && opts.selfCloseTags) {
                out = [...out, (
                    <OpenTag
                        path={path}
                        name={snacElementNode["N"]}
                        attributes={snacElementNode["A"]}
                        isNotEmpty={false}
                        isSelected={snacElementNode["q"]}
                        attributesOpen={snacElementNode["a"]}
                        childrenOpen={snacElementNode["o"]}
                        showSelected={true}
                        showAttributesOpen={true}
                        showChildrenOpen={true}
                    />
                )]
            }
            else {
                out = [...out, (
                    <Fragment key={i}>
                        <OpenTag
                            path={path}
                            name={snacElementNode["N"]}
                            attributes={snacElementNode["A"]}
                            isNotEmpty={true}
                            isSelected={snacElementNode["q"]}
                            attributesOpen={snacElementNode["a"]}
                            childrenOpen={snacElementNode["o"]}
                            showSelected={true}
                            showAttributesOpen={true}
                            showChildrenOpen={true}
                        />
                        {_snac2xml(snacElementNode["C"], newPath, funcs, opts)}
                        <CloseTag
                            path={path}
                            name={snacElementNode["N"]}
                            showSelected={true}
                            isSelected={snacElementNode["q"]}
                        />
                    </Fragment>
                )]
            }
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.trimText) {
                text = text.trim()
            }
            out = [...out, (
                <Text
                    key={i}
                    path={path}
                    text={text}
                    isSelected={snacTextNode["q"]}
                    showSelected={true}
                    isOpen={snacTextNode["o"]}
                    showOpen={true}
                />
            )]
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out = [...out, (
                <CDATA
                    key={i}
                    path={path}
                    cdata={escapeCDATA(snacCDATANode["D"])}
                    isSelected={snacCDATANode["q"]}
                    showSelected={true}
                    isOpen={snacCDATANode["o"]}
                    showOpen={true}
                />
            )]
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out = [...out, (
                    <Comment
                        key={i}
                        path={path}
                        comment={escapeComment(snacCommentNode["M"])}
                        isSelected={snacCommentNode["q"]}
                        showSelected={true}
                        isOpen={snacCommentNode["o"]}
                        showOpen={true}
                    />
                )]
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out = [...out, (
                    <PI
                        key={i}
                        path={path}
                        lang={snacPINode["L"]}
                        body={escapePIBody(snacPINode["B"])}
                        isSelected={snacPINode["q"]}
                        showSelected={true}
                        isOpen={snacPINode["o"]}
                        showOpen={true}
                    />
                )]
            }
        }
    }

    return out
}

export default snac2xml
