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

export interface SNAC2XMLJSXFuncs {
    OpenTag: OpenTagJSXType,
    CloseTag: CloseTagJSXType,
    EmptyTag: EmptyTagJSXType,
    Text: TextJSXType,
    CDATA: CDATAJSXType,
    Comment: CommentJSXType,
    PI: PIJSXType,
    Attributes: AttributesJSXType,
    Attribute: AttributeJSXType,
    Prefix: PrefixJSXType,
}

export interface OpenTagJSXType { (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element }
export interface CloseTagJSXType { (props: { path: number[], name: string }): JSX.Element }
export interface EmptyTagJSXType { (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element }
export interface TextJSXType { (props: { path: number[], text: string }): JSX.Element }
export interface CDATAJSXType { (props: { path: number[], cdata: string }): JSX.Element }
export interface CommentJSXType { (props: { path: number[], comment: string }): JSX.Element }
export interface PIJSXType { (props: { path: number[], lang: string, body: string }): JSX.Element }
export interface AttributesJSXType { (props: { path: number[], attributes: AttributesType }): JSX.Element | null }
export interface AttributeJSXType { (props: { path: number[], name: string, value: string }): JSX.Element }
export interface PrefixJSXType { (props: { path: number[], opts: PrefixOpts }): JSX.Element | null }

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

