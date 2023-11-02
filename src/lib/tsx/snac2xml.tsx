import React, { Fragment } from 'react';

import {
    SNAC2XMLJSXFuncs, SNACItem, SNACElement, SNACText,
    SNACCDATA, SNACComment, SNACPINode, SNAC2XMLOpts,
} from '../snac/types'

import {
    escapeHtml, escapeCDATA, escapeComment, escapePIBody,
} from '../snac/utils'

const snac2xml = (root: SNACItem[], snac: SNACItem[], funcs: SNAC2XMLJSXFuncs, opts: SNAC2XMLOpts) => {
    return _snac2xml(root, snac, [], funcs, opts)
}

const _snac2xml = (root: SNACItem[], snac: SNACItem[], path: number[], funcs: SNAC2XMLJSXFuncs, opts: SNAC2XMLOpts) => {
    const { OpenTag, CloseTag, Text, CDATA, Comment, PI } = funcs
    let out: JSX.Element[] = []

    for (let i in Object.keys(snac)) {
        const newPath = [...path, parseInt(i)]

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;
            if (snacElementNode["C"].length === 0 && opts.selfCloseTags) {
                out = [...out, (
                    <OpenTag
                        root={root}
                        node={snacElementNode}
                        path={path}
                        isNotEmpty={false}
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
                            root={root}
                            node={snacElementNode}
                            path={path}
                            isNotEmpty={true}
                            showSelected={true}
                            showAttributesOpen={true}
                            showChildrenOpen={true}
                        />
                        {_snac2xml(root, snacElementNode["C"], newPath, funcs, opts)}
                        <CloseTag
                            root={root}
                            node={snacElementNode}
                            path={path}
                            showSelected={true}
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
                    root={root}
                    node={snacTextNode}
                    path={path}
                    showSelected={true}
                    showOpen={true}
                />
            )]
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out = [...out, (
                <CDATA
                    key={i}
                    root={root}
                    node={snacCDATANode}
                    path={path}
                    showSelected={true}
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
                        root={root}
                        node={snacCommentNode}
                        path={path}
                        showSelected={true}
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
                        root={root}
                        node={snacPINode}
                        path={path}
                        showSelected={true}
                        showOpen={true}
                    />
                )]
            }
        }
    }

    return out
}

export default snac2xml
