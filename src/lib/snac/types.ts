//import React from 'react'

export enum SwitchStates { 'ON', 'OFF', 'HIDDEN' }

export type XMLOpts = {
    prefiNewLine: boolean
    prefixShow: boolean
    prefixChar: string
    attributePrefix: string
    selfCloseTags: boolean
    trimText: boolean
    allowComments: boolean
    allowPIs: boolean
}

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
    Text: TextJSXType,
    CDATA: CDATAJSXType,
    Comment: CommentJSXType,
    PI: PIJSXType,
    Attributes: AttributesJSXType,
    Attribute: AttributeJSXType,
    Prefix: PrefixJSXType,
}

export interface OpenTagJSXType {
    // (props: {
    //     path: number[], 
    //     name: string, 
    //     attributes: AttributesType,
    //     isNotEmpty: boolean,
    //     isSelected: boolean, 
    //     attributesOpen: boolean, 
    //     childrenOpen: boolean,
    //     showSelected: boolean,
    //     showAttributesOpen: boolean,
    //     showChildrenOpen: boolean,
    // }): JSX.Element

    (props: {
        root: SNACItem[],
        node: SNACElement
        path: number[], 
        isNotEmpty: boolean,
        showSelected: boolean,
        showAttributesOpen: boolean,
        showChildrenOpen: boolean,
    }): JSX.Element
}
/* 
SNACElement
<OpenTag
path={path}

name={snacElementNode["N"]}
attributes={snacElementNode["A"]}
attributesOpen={snacElementNode["a"]}
childrenOpen={snacElementNode["o"]}
isSelected={snacElementNode["q"]}


isNotEmpty={false}
showSelected={true}
showAttributesOpen={true}
showChildrenOpen={true}
/> */

export interface CloseTagJSXType {
    (props: {
        root: SNACItem[],
        node: SNACElement,
        path: number[], 
        //name: string,
        showSelected: boolean,
        //isSelected: boolean
    }): JSX.Element
}

export interface TextJSXType {
    (props: {
        root: SNACItem[],
        node: SNACText,
        path: number[],
        //text: string,
        //isSelected: boolean,
        showSelected: boolean,
        //isOpen: boolean,
        showOpen: boolean,
    }): JSX.Element
}
export interface CDATAJSXType {
    (props: {
        root: SNACItem[],
        node: SNACCDATA,
        path: number[],
        //cdata: string,
        //isSelected: boolean,
        showSelected: boolean,
        //isOpen: boolean,
        showOpen: boolean,
    }): JSX.Element
}
export interface CommentJSXType {
    (props: {
        root: SNACItem[],
        node: SNACComment,
        path: number[],
        //comment: string,
        //isSelected: boolean,
        showSelected: boolean,
        //isOpen: boolean,
        showOpen: boolean,
    }): JSX.Element
}
export interface PIJSXType {
    (props: {
        root: SNACItem[],
        node: SNACPINode,
        path: number[],
        //lang: string,
        //body: string,
        //isSelected: boolean,
        showSelected: boolean,
        //isOpen: boolean,
        showOpen: boolean,
    }): JSX.Element
}
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

