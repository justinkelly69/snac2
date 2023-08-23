import { escapeCDATA } from "./text";
import { escapePIBody } from "./text";
import { escapeComment } from "./text";
import { escapeHtml } from "./text";
import {
    PrefixOptions,
    SNACElement,
    SNACText,
    SNACCDATA,
    SNACComment,
    SNACPINode,
    SNACItem,
    AttributesType,
} from "./types";

const processSNAC = (snac: SNACItem[], methods: any) => {
    return _processSNAC(snac, methods, [])
}

const _processSNAC = (snac: SNACItem[], methods: any, path: number[]) => {
    let out: string = "";

    const prefix = getPrefix(path, methods.prefixOptions, false)

    for (let i in Object.keys(snac)) {

        const newPath = [...path, parseInt(i)]
        const newPathStr = `[${newPath.join(',')}]: `

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;

            const elementName = snacElementNode["N"]
            const attrs = attributesToXML(snacElementNode["A"], methods, newPath)
            const children = _processSNAC(snacElementNode["C"], methods, newPath)

            if (children.length === 0 && methods.xmlOptions["selfCloseTags"]) {
                out = methods.emptyTag(out, prefix, elementName, attrs)
            }
            else {
                out = methods.openTag(out, path, elementName, attrs, methods.prefixOptions, getPrefix)
                out = methods.children(out, children)
                out = methods.closeTag(out, path, elementName, methods.prefixOptions, getPrefix)
            }
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText

            let text = escapeHtml(snacTextNode["T"])
            if (methods.xmlOptions["trimText"]) {
                text = text.trim()
            }
            out = methods.text(out, path, text, methods.prefixOptions, getPrefix)
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out = methods.cdata(out, path, escapeCDATA(snacCDATANode["D"]), methods.prefixOptions, getPrefix)
        }

        else if (snac[i].hasOwnProperty("M")) {
            const snacCommentNode: SNACComment = snac[i] as SNACComment
            out = methods.comment(out, path, escapeComment(snacCommentNode["M"]), methods.prefixOptions, getPrefix)
        }

        else if (snac[i].hasOwnProperty("L")) {
            const snacPINode: SNACPINode = snac[i] as SNACPINode
            out = methods.pi(out, path, snacPINode["L"], escapePIBody(snacPINode["B"]), methods.prefixOptions, getPrefix)
        }
    }

    return out
}

const attributesToXML = (atts: AttributesType, methods: any, path: number[]) => {
    let out: string = "";
    const prefix = getPrefix(path, methods.prefixOptions, true)


    for (const name of Object.keys(atts)) {
        out = methods.attribute(out, path, name, ` ${escapeHtml(atts[name])}`, methods.prefixOptions, getPrefix)
    }

    return out;
}

const getPrefix = (path: number[], prefixOptions: PrefixOptions, isAttribute: boolean) => {
    let out: string = ""
    const depth = path.length

    if (!prefixOptions["showPrefix"]) {
        out = `${out}${prefixOptions["newline"]}`

        if (prefixOptions["usePrefix"]) {
            out = `${out}${prefixOptions["prefixStart"]}`

            for (let i of Array.from({ length: depth }, (value, index) => index)) {
                out = `${out}${prefixOptions["prefixCharacter"]}`
            }
        }

        if (isAttribute) {
            out = `${out}${prefixOptions["attributePrefix"]}`
        }
    }

    return out;
}

export default processSNAC