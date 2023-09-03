import {
    SNACNamesNode, SNACItem, SNACElement, AttributesXMLhasChildrenType, AttributesType,
    QuoteChar, AttributeXMLType, AttributeValueType
} from './types'

import {
    escapeHtml, unEscapeHtml, escapeCDATA, unEscapeCDATA, escapeComment, unEscapeComment,
    testPILang, escapePIBody, unEscapePIBody
} from './utils'

const xml2snac = (xml: string) => {
    const stack: SNACNamesNode[] = []
    return _xml2snac(xml, stack)['out']
}

const _xml2snac = (xml: string, stack: SNACNamesNode[]) => {
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
                const kids = _xml2snac(xml, stack)
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
            const snac: SNACNamesNode = {
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
                out.push({
                    D: CDATATagData[1],
                    o: true,
                    q: false
                })
            }
            xml = CDATATagData[2]
        }

        else if (commentTagData !== null) {
            if (stack.length > 0) {
                out.push({
                    M: commentTagData[1],
                    o: true,
                    q: false
                })
            }
            xml = commentTagData[2]
        }

        else if (PITagData !== null) {
            if (stack.length > 0) {
                out.push({
                    L: PITagData[1],
                    B: PITagData[2],
                    o: true,
                    q: false
                })
            }
            xml = PITagData[3]
        }

        else if (textTagData !== null) {
            if (stack.length > 0) {
                out.push({
                    T: unEscapeHtml(textTagData[1]),
                    o: true,
                    q: false
                })
            }
            xml = textTagData[2]
        }

        else if (blankTagData !== null) {
            if (stack.length > 0) {
                out.push({
                    T: "",
                    o: true,
                    q: false
                })
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

const getAttributes = (xml: string): AttributesXMLhasChildrenType => {
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

const addAttribute = (attributes: AttributesType, nameStr: string, quoteChar: QuoteChar, xml: string): AttributeXMLType => {
    const attVal = getAttributeValue(xml, quoteChar)
    attributes[nameStr] = attVal['value']

    return {
        attributes: attributes,
        xml: attVal['xml']
    }
}

const getAttributeValue = (text: string, quoteChar: QuoteChar): AttributeValueType => {
    const values = getValueString(text, quoteChar)
    if (values === null) {
        throw Error(`Bad xml ${text}`)
    }

    const re = new RegExp(`\\${quoteChar}`, 'g')
    return {
        value: unEscapeHtml(values['value'].replace(re, quoteChar)),
        xml: values['xml']
    }
}

const getValueString = (text: string, quoteChar: QuoteChar): AttributeValueType | null => {
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) === quoteChar && text.charAt(i - 1) !== '\\') {
            return {
                value: text.substring(0, i),
                xml: text.substring(i + 1)
            }
        }
    }
    return null
}

export default xml2snac