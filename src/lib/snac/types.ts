import { ReactElement } from "react"

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

export interface SNAC2XMLFuncs {
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

export interface SNAC2XMLOutFuncs {
    OpenTag: OpenTagType,
    CloseTag: CloseTagType,
    EmptyTag: EmptyTagType,
    Text: TextType,
    CDATA: CDATAType,
    Comment: CommentType,
    Pi: PiType,
    Attributes: AttributesType1,
    Attribute: AttributeType,
    Prefix: PrefixType,
}

export interface OpenTagType {
    (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element
}

export interface CloseTagType {
    (props: { path: number[], name: string }): JSX.Element
}

export interface EmptyTagType {
    (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element
}

export interface TextType {
    (props: { path: number[], text: string }): JSX.Element
}

export interface CDATAType {
    (props: { path: number[], cdata: string }): JSX.Element
}

export interface CommentType {
    (props: { path: number[], comment: string }): JSX.Element
}

export interface PiType {
    (props: { path: number[], lang: string, body: string }): JSX.Element
}

export interface AttributesType1 {
    (props: { path: number[], attributes: AttributesType }): JSX.Element
}

export interface AttributeType {
    (props: { path: number[], name: string, value: string }): JSX.Element
}

export interface PrefixType {
    (props: { path: number[], opts: PrefixOpts }): JSX.Element
}

export interface AttributesType {
    [name: string]: string
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

