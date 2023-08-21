export type QuoteChar = '"' | "'"

export type XMLOptions = {
    prefixStart: string,
    prefixCharacter: string,
    attributePrefix: string,
    minify: boolean,
    usePrefix: boolean,
    selfCloseTags: boolean,
    trimText: boolean,
}

export type AttributesType = {
    [name: string]:  string
}

export type AttributesXMLhasChildrenType = {
    attributes: AttributesType,
    hasChildren: boolean,
    xml: string
}

export type AttributeXMLType = {
    attributes: AttributesType,
    xml: string
}

export type AttributeValueType = {
    value: string,
    xml: string
}
export type SNACNSNode = {
    N: string,
}

export interface SNACNode {
    _: number[],
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

