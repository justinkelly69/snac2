import React from 'react'

import { AttributesType, PrefixOpts } from '../snac/types'

export const prefixOpts = {
    showPrefix: true,
    newLine: "\n",
    usePrefix: true,
    startChar: ">",
    charOn: "  ",
    charOff: "  ",
    attributePrefix: "  ",
}

export const xmlOpts = {
    selfCloseTags: true,
    trimText: true,
    allowComments: true,
    allowPIs: true,
}

export const OpenTag = (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        &lt;{props.name}
        <Attributes path={props.path} attributes={props.attributes} />
        {Object.keys(props.attributes).length > 0 ?
            <Prefix path={props.path} opts={prefixOpts} />
            : null
        }
        &gt;
    </div>

export const CloseTag = (props: { path: number[], name: string }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        &lt;/{props.name}&gt;
    </div>

export const EmptyTag = (props: { path: number[], name: string, attributes: AttributesType }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        &lt;{props.name}
        <Attributes path={props.path} attributes={props.attributes} />
        {Object.keys(props.attributes).length > 0 ?
            <Prefix path={props.path} opts={prefixOpts} />
            : null
        }
        /&gt;
    </div>

export const Text = (props: { path: number[], text: string }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        [{props.text}]
    </div>

export const CDATA = (props: { path: number[], cdata: string }): JSX.Element =>
    <>
        <div>
            <Prefix path={props.path} opts={prefixOpts} />
            &lt;![CDATA[{props.cdata}]]&gt;
        </div>
    </>

export const Comment = (props: { path: number[], comment: string }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        &lt;!--{props.comment}--&gt;
    </div>

export const Pi = (props: { path: number[], lang: string, body: string }): JSX.Element =>
    <div>
        <Prefix path={props.path} opts={prefixOpts} />
        &lt;?{props.lang} {props.body} ?&gt;
    </div>

export const Attributes = (props: { path: number[], attributes: AttributesType }): JSX.Element => {
    return Object.keys(props.attributes).length > 0 ?
        <div>
            {Object.keys(props.attributes).map((a, i) => {
                return (
                    <span key={i}>
                        {i > 0 ? <br /> : null}
                        <Attribute path={props.path} name={a} value={props.attributes[a]} />
                    </span>

                )
            })}
        </div> :
        <></>
}

export const Attribute = (props: { path: number[], name: string, value: string }): JSX.Element =>
    <span>
        <Prefix path={props.path} opts={prefixOpts} />
        {prefixOpts.attributePrefix}
        {props.name}=&quot;{props.value}&quot;
    </span>


export const Prefix = (props: { path: number[], opts: PrefixOpts }): JSX.Element => {
    let out = ""
    for (let i in props.path) {
        out += props.opts.charOn;
    }
    return (<span>{out}</span>)
}