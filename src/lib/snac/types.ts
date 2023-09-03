export type PrefixOpts = {
    showPrefix: boolean
    newLine: string
    usePrefix: boolean
    startChar: string
    charOn: string
    charOff: string
    attributePrefix: string
}

export type SNAC2XMLOpts = {
    selfCloseTags: boolean
    trimText: boolean
    allowComments: boolean
    allowPIs: boolean
}

export interface SNAX2XMLFuncs {
    openTag: (path: number[], elementName: string, attrs: string) => string,
    children: (children: string) => string,
    closeTag: (path: number[], elementName: string) => string,
    emptyTag: (path: number[], elementName: string, attrs: string) => string,
    text: (path: number[], text: string) => string,
    cdata: (path: number[], cdata: string) => string,
    comment: (path: number[], comment: string) => string,
    pi: (path: number[], lang: string, body: string) => string,
    attribute: (path: number[], name: string, value: string) => string,
    getPrefix: (path: number[], isAttribute: boolean, opts: PrefixOpts) => string,
}

export type SNACNamesNode = {
    N: string,
}

export interface SNACNode {
    o: boolean,
    q: boolean
}

export interface SNACElement extends SNACNode {
    N: string,
    A: AttributesType,
    C: SNACItem[],
    a: boolean,
}

export interface SNACText extends SNACNode {
    T: string
}

export interface SNACCDATA extends SNACNode {
    D: string
}

export interface SNACComment extends SNACNode {
    M: string
}

export interface SNACPINode extends SNACNode {
    L: string,
    B: string
}

export type SNACItem = SNACElement | SNACText | SNACCDATA | SNACComment | SNACPINode

export interface AttributesType {
    [name: string]: string
}

export interface AttributesXMLhasChildrenType {
    attributes: AttributesType,
    hasChildren: boolean,
    xml: string
}

export interface AttributeXMLType {
    attributes: AttributesType,
    xml: string
}

export interface AttributeValueType {
    value: string,
    xml: string
}

export type QuoteChar = '"' | "'"

