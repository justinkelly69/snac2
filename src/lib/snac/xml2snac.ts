import { unEscapeHtml } from "./text";
import {
    QuoteChar,
    SNACNSNode,
    SNACNode,
    SNACElement,
    SNACText,
    SNACCDATA,
    SNACComment,
    SNACPINode,
    SNACItem,
    AttributesType,
    AttributesXMLhasChildrenType,
    AttributeXMLType,
    AttributeValueType
} from "./types";

export const processXML = (xml: string): SNACItem[] => {
    const stack: SNACNSNode[] = []
    return _xml2snac(xml, stack, [])['out']
}

export const _xml2snac = (xml: string, stack: SNACNSNode[], path: number[]) => {
    const out: SNACItem[] = []
    let i: number = 0

    while (xml.length > 0) {
        const openTagData = xml.match(/^<([\w]*:?[\w]+)(.*)$/s)
        const closeTagData = xml.match(/^<\/([\w]*:?[\w]+)>(.*)$/s)
        const CDATATagData = xml.match(/^<!\[CDATA\[(.*?)\]\]>(.*)$/s)
        const commentTagData = xml.match(/^<!--(.*?)-->(.*)$/s)
        const PITagData = xml.match(/^<\?(\w+=?)\s+(.*?)\?>(.*)$/s)
        const textTagData = xml.match(/^([^<>]+)(.*)$/s)
        const blankTagData = xml.match(/^$/s)

        if (openTagData !== null) {
            const tagName = openTagData[1]
            const attributeData = getAttributes(openTagData[2])
            xml = attributeData['xml']

            const snac: SNACElement = {
                _: [...path, i],
                N: tagName,
                A: attributeData['attributes'],
                C: [],
                a: true,
                o: true,
                q: false
            }

            stack.push({
                N: snac['N']
            })

            if (attributeData['hasChildren']) {
                const kids = _xml2snac(xml, stack, [...path, i])
                snac['C'] = kids['out']
                xml = kids['xml']
                out.push(snac)

            } else {
                out.push(snac)
                const prev = stack.pop()
            }
            i = i + 1
        }

        else if (closeTagData !== null) {
            const tagName = closeTagData[1]
            const snac: SNACNSNode = {
                N: tagName
            }

            const prev = stack.pop()
            if (prev && (prev['N'] !== snac['N'])) {
                throw Error(`\n\nUNMATCHED TAG <${prev['N']}></${snac['N']}>\n`)
            }

            return {
                xml: closeTagData[2],
                out: out
            }
        }

        else if (CDATATagData !== null) {
            if (stack.length > 0) {
                const data: SNACCDATA = {
                    _: [...path, i],
                    D: CDATATagData[1],
                    o: true,
                    q: false
                }
                out.push(data)
                i = i + 1
            }
            xml = CDATATagData[2]
        }

        else if (commentTagData !== null) {
            if (stack.length > 0) {
                const data: SNACComment = {
                    _: [...path, i],
                    M: commentTagData[1],
                    o: true,
                    q: false
                }
                out.push(data)
                i = i + 1
            }
            xml = commentTagData[2]
        }

        else if (PITagData !== null) {
            if (stack.length > 0) {
                const data: SNACPINode = {
                    _: [...path, i],
                    L: PITagData[1],
                    B: PITagData[2],
                    o: true,
                    q: false
                }
                out.push(data)
                i = i + 1
            }
            xml = PITagData[3]
        }

        else if (textTagData !== null) {
            if (stack.length > 0) {
                const data: SNACText = {
                    _: [...path, i],
                    T: textTagData[1],
                    o: true,
                    q: false
                }
                out.push(data)
                i = i + 1
            }
            xml = textTagData[2]

        }

        else if (blankTagData !== null) {
            if (stack.length > 0) {
                const data: SNACText = {
                    _: [...path, i],
                    T: "",
                    o: true,
                    q: false
                }
                out.push(data)
                i = i + 1
            }
            xml = ""

        }

        else {
            throw Error(`Invalid tag ${xml}\n`)
        }


    }

    return {
        xml: "",
        out: out
    }

}

export const getAttributes = (xml: string): AttributesXMLhasChildrenType => {
    let attributes: AttributesType = {}

    while (xml.length > 0) {
        const closingTag = xml.match(/^\s*(\/?>)(.*)$/s)
        const nextAttribute = xml.match(/^\s*([\w]+:?[\w]+)=(['"])(.*)$/s)

        if (closingTag) {
            let hasChildren = false

            if (closingTag[1] === '>') {
                hasChildren = true
            }

            return {
                xml: closingTag[2],
                hasChildren: hasChildren,
                attributes: attributes
            }
        }

        else if (nextAttribute) {
            const quoteChar = nextAttribute[2] as QuoteChar
            const att = addAttribute(attributes, nextAttribute[1], quoteChar, nextAttribute[3])
            attributes = att['attributes']
            xml = att['xml']
        }

        else {
            throw Error(`INVALID ATTRIBUTE ${xml}\n`)
        }
    }

    return {
        xml: xml,
        hasChildren: false,
        attributes: {}
    }

}

export const addAttribute = (attributes: AttributesType, nameStr: string, quoteChar: QuoteChar, xml: string): AttributeXMLType => {
    const attVal = getAttributeValue(xml, quoteChar)

    attributes[nameStr] = attVal['value']

    return {
        attributes: attributes,
        xml: attVal['xml']
    }
}

export const getAttributeValue = (text: string, quoteChar: QuoteChar): AttributeValueType => {
    const values = getValueString(text, quoteChar)
    if (values === null) {
        throw Error(`Bad xml ${text}`)
    }

    const re = new RegExp(`\\${quoteChar}`, 'g')
    const value = unEscapeHtml(values['value'].replace(re, quoteChar))
    const xml = values['xml']

    return {
        value,
        xml
    }
}

export const getValueString = (text: string, quoteChar: QuoteChar): AttributeValueType | null => {
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === quoteChar && text.charAt(i - 1) !== '\\') {
            const value = text.substring(0, i)
            const xml = text.substring(i + 1)

            return {
                value,
                xml
            }
        }
    }
    return null
}