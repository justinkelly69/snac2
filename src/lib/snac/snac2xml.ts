import { escapeCDATA } from "./text";
import { escapePIBody } from "./text";
import { escapeComment } from "./text";
import { escapeHtml } from "./text";
import {
    XMLOptions,
    SNACNSNode,
    SNACElement,
    SNACText,
    SNACCDATA,
    SNACComment,
    SNACPINode,
    SNACItem,
    AttributesType,
} from "./types";
//import { _xml2snac } from "./xml2snac";

export const processSNAC = (snac: SNACItem[], options: XMLOptions) => {
    return _snac2xml(snac, options, 0)
}

export const _snac2xml = (snac: SNACItem[], options: XMLOptions, depth: number) => {
    let out: string = "";

    const prefix = getPrefix(depth, options, false)

    for (const snacNode of snac) {
        if (snacNode.hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snacNode as SNACElement;
            const elementName = snacElementNode["N"]
            const attrs = attributesToXML(snacElementNode["A"], options, depth)
            const children = _snac2xml(snacElementNode["C"], options, depth + 1)

            if (children.length === 0 && options["selfCloseTags"]) {
                out = `${out}${prefix}<${elementName}${attrs} />`
            }
            else {
                out = `${out}${prefix}<${elementName}${attrs}>`
                out = `${out}${children}`
                out = `${out}${prefix}</${elementName}>`
            }
        }

        else if (snacNode.hasOwnProperty("T")) {
            const snacTextNode: SNACText = snacNode as SNACText
            let snacText = escapeHtml(snacTextNode["T"])
            if (options.trimText) {
                snacText = snacText.trim()
            }
            out = `${out}${prefix}${snacText}`
        }

        else if (snacNode.hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snacNode as SNACCDATA
            const snacCDATA = escapeCDATA(snacCDATANode["D"])
            out = `${out}${prefix}<![CDATA[${snacCDATA}]]>`
        }

        else if (snacNode.hasOwnProperty("M")) {
            const snacCommentNode: SNACComment = snacNode as SNACComment
            const snacComment = escapeComment(snacCommentNode["M"])
            out = `${out}${prefix}<!--${snacComment}-->`
        }

        else if (snacNode.hasOwnProperty("L")) {
            const snacPINode: SNACPINode = snacNode as SNACPINode
            const snacPILang = snacPINode["L"]
            const snacPIBody = escapePIBody(snacPINode["B"])
            out = `${out}${prefix}<?${snacPILang} ${snacPIBody}?>`
        }
    }

    return out
}

export const attributesToXML = (atts: AttributesType, options: XMLOptions, depth: number) => {
    let out: string = "";
    const prefix = getPrefix(depth, options, true)

    for (const snacName of Object.keys(atts)) {
        out = `${out}${prefix}${snacName}="${escapeHtml(atts[snacName])}"`
    }

    return out;
}

export const getPrefix = (depth: number, options: XMLOptions, isAttribute: boolean) => {
    let out: string = ""

    if (!options["minify"]) {
        out = `\n`

        if (options["usePrefix"]) {
            out = `${out}${options["prefixStart"]}`

            for (let i of Array.from({ length: depth }, (value, index) => index)) {
                out = `${out}${options["prefixCharacter"]}`
            }
        }

        if (isAttribute) {
            out = `${out}${options["attributePrefix"]}`
        }
    }

    return out;
}
