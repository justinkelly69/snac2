import {
    SNAX2XMLFuncs, SNACItem, SNACElement, AttributesType,
    SNACText, SNACCDATA, SNACComment, SNACPINode,
    SNAC2XMLOpts
} from './types'

import {
    escapeHtml, escapeCDATA, escapeComment,
    escapePIBody,
} from './utils'

const snac2xml = (snac: SNACItem[], funcs: SNAX2XMLFuncs, opts: SNAC2XMLOpts) => {
    return _snac2xml(snac, [], funcs, opts)
}

const _snac2xml = (snac: SNACItem[], path: number[], funcs: SNAX2XMLFuncs, opts: SNAC2XMLOpts) => {
    let out: string = "";

    for (let i in Object.keys(snac)) {
        const newPath = [...path, parseInt(i)]

        if (snac[i].hasOwnProperty("N")) {
            const snacElementNode: SNACElement = snac[i] as SNACElement;

            const elementName = snacElementNode["N"]
            const attrs = attributesToXML(snacElementNode["A"], newPath, funcs)
            const children = _snac2xml(snacElementNode["C"], newPath, funcs, opts)

            if (children.length === 0 && opts.selfCloseTags) {
                out += funcs.emptyTag(path, elementName, attrs)
            }
            else {
                out += funcs.openTag(path, elementName, attrs)
                out += funcs.children(children)
                out += funcs.closeTag(path, elementName)
            }
        }

        else if (snac[i].hasOwnProperty("T")) {
            const snacTextNode: SNACText = snac[i] as SNACText
            let text = escapeHtml(snacTextNode["T"])
            if (opts.trimText) {
                text = text.trim()
            }
            out += funcs.text(path, text)
        }

        else if (snac[i].hasOwnProperty("D")) {
            const snacCDATANode: SNACCDATA = snac[i] as SNACCDATA
            out += funcs.cdata(path, escapeCDATA(snacCDATANode["D"]))
        }

        else if (snac[i].hasOwnProperty("M")) {
            if (opts.allowComments) {
                const snacCommentNode: SNACComment = snac[i] as SNACComment
                out += funcs.comment(path, escapeComment(snacCommentNode["M"]))
            }
        }

        else if (snac[i].hasOwnProperty("L")) {
            if (opts.allowPIs) {
                const snacPINode: SNACPINode = snac[i] as SNACPINode
                out += funcs.pi(path, snacPINode["L"], escapePIBody(snacPINode["B"]))
            }
        }
    }

    return out
}

const attributesToXML = (atts: AttributesType, path: number[], funcs: SNAX2XMLFuncs) => {
    let out: string = "";
    for (const name of Object.keys(atts)) {
        out += funcs.attribute(path, name, ` ${escapeHtml(atts[name])}`)
    }
    return out;
}

export default snac2xml
