import React, { Fragment, useState } from 'react';

import {
    SNAC2XMLJSXFuncs, SNACItem, SNACElement, SNACText,
    SNACCDATA, SNACComment, SNACPINode, SNACOpts,
} from '../snac/types'

import {
    escapeHtml
} from '../snac/textutils'

const snac2xml = (root: SNACItem[], snac: SNACItem[], funcs: SNAC2XMLJSXFuncs, opts: SNACOpts) => {
    return _snac2xml(root, snac, [], funcs, opts)
}

const _snac2xml = (root: SNACItem[], snac: SNACItem[], path: number[], funcs: SNAC2XMLJSXFuncs, opts: SNACOpts) => {
    const { OpenTag, CloseTag, Text, CDATA, Comment, PI } = funcs
    let out: JSX.Element[] = []

    for (let i in Object.keys(snac)) {
        const newPath = [...path, parseInt(i)]

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;
            if (snacElementNode["C"].length === 0 && opts.xml_selfCloseTags) {
                out = [...out, (
                    <OpenTag
                        key={i}
                        root={root}
                        node={snacElementNode}
                        path={newPath}
                        isNotEmpty={false}
                        showSelected={true}
                        showAttributesOpen={true}
                        showChildrenOpen={true}
                        opts={opts}
                    />
                )]
            }
            else {
                out = [...out, (
                    <Fragment key={i}>
                        <OpenTag
                            root={root}
                            node={snacElementNode}
                            path={newPath}
                            isNotEmpty={true}
                            showSelected={true}
                            showAttributesOpen={true}
                            showChildrenOpen={true}
                            opts={opts}
                        />
                        {_snac2xml(root, snacElementNode["C"], newPath, funcs, opts)}
                        <CloseTag
                            root={root}
                            node={snacElementNode}
                            path={newPath}
                            showSelected={true}
                            opts={opts}
                        />
                    </Fragment>
                )]
            }
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.xml_trimText) {
                text = text.trim()
            }
            out = [...out, (
                <Text
                    key={i}
                    root={root}
                    node={snacTextNode}
                    path={newPath}
                    showSelected={true}
                    showOpen={true}
                    opts={opts}
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
                    path={newPath}
                    showSelected={true}
                    showOpen={true}
                    opts={opts}
                />
            )]
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.xml_allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out = [...out, (
                    <Comment
                        key={i}
                        root={root}
                        node={snacCommentNode}
                        path={newPath}
                        showSelected={true}
                        showOpen={true}
                        opts={opts}
                    />
                )]
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.xml_allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out = [...out, (
                    <PI
                        key={i}
                        root={root}
                        node={snacPINode}
                        path={newPath}
                        showSelected={true}
                        showOpen={true}
                        opts={opts}
                    />
                )]
            }
        }
    }

    return out
}

export default snac2xml
