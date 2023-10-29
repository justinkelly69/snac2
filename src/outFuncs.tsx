import React, { Fragment } from 'react'

import { AttributesType, PrefixOpts, SwitchStates } from './lib/snac/types'

export const prefixOpts = {
    showPrefix: true,
    newLine: "\n",
    usePrefix: true,
    startChar: ">",
    charOn: "    ",
    charOff: "    ",
    attributePrefix: "    ",
}

export const switchOpts = {
    selectOn: "+",
    selectOff: "-",
    selectHide: " ",
    attributesOpen: "+",
    attributesClose: "-",
    attributesHide: " ",
    elementOpen: "+",
    elementClose: "-",
    elementHide: " "
}

export const xmlOpts = {
    selfCloseTags: true,
    trimText: true,
    allowComments: true,
    allowPIs: true,
}

export const OpenCloseEmptyTag = (props: {
    path: number[],
    name: string,
    attributes: AttributesType,
    isEmpty: boolean,
    isClose: boolean,
    isSelected: boolean
    attributesOpen: boolean
    childrenOpen: boolean
    showSelected: boolean,
    showAttributesOpen: boolean,
    showChildrenOpen: boolean,
}): JSX.Element => {

    console.log(Object.keys(props.attributes).length)

    let selectState = SwitchStates.HIDDEN
    let attributesOpenState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN

    const hasAttributes = Object.keys(props.attributes).length

    if (!props.isClose) {
        selectState = props.isSelected ? SwitchStates.OFF : SwitchStates.ON

        if (hasAttributes) {
            attributesOpenState = props.attributesOpen ? SwitchStates.ON : SwitchStates.OFF
        }

        if (!props.isEmpty) {
            childrenOpenState = props.childrenOpen ? SwitchStates.ON : SwitchStates.OFF
        }
    }

    return (
        <div className='element'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />

            <Prefix path={props.path} opts={prefixOpts} />

            <ShowHideSwitch selected={childrenOpenState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                hide={switchOpts.elementHide} className='element-show-hide' />
            &lt;
            {props.isClose ? '/' : null}
            <NsName name={props.name} type='element' />
            {!props.isClose ?
                <>
                    <Attributes
                        path={props.path}
                        attributes={props.attributes}
                    />
                    {Object.keys(props.attributes).length > 0 ?
                        <Prefix
                            path={props.path}
                            opts={prefixOpts}
                        />
                        : null
                    }
                    {props.isEmpty ? '/' : null}
                </>
                : null
            }
            &gt;
            <ShowHideSwitch selected={attributesOpenState} off={switchOpts.attributesClose} on={switchOpts.attributesOpen}
                hide={switchOpts.attributesHide} className='attributes-show-hide' />
        </div>
    )
}

export const OpenTag = (props: {
    path: number[],
    name: string,
    attributes: AttributesType
    isSelected: boolean
    attributesOpen: boolean
    childrenOpen: boolean
}): JSX.Element =>
    <OpenCloseEmptyTag
        path={props.path}
        name={props.name}
        attributes={props.attributes}
        isEmpty={false}
        isClose={false}
        isSelected={props.isSelected}
        attributesOpen={props.attributesOpen}
        childrenOpen={props.childrenOpen}
        showSelected={true}
        showAttributesOpen={true}
        showChildrenOpen={true}
    />

export const EmptyTag = (props: {
    path: number[],
    name: string,
    attributes: AttributesType
    isSelected: boolean
    attributesOpen: boolean
}): JSX.Element =>
    <OpenCloseEmptyTag
        path={props.path}
        name={props.name}
        attributes={props.attributes}
        isEmpty={true}
        isClose={false}
        isSelected={props.isSelected}
        attributesOpen={props.attributesOpen}
        childrenOpen={false}
        showSelected={true}
        showAttributesOpen={true}
        showChildrenOpen={false}
    />

export const CloseTag = (props: {
    path: number[],
    name: string
}): JSX.Element =>
    <OpenCloseEmptyTag
        path={props.path}
        name={props.name}
        attributes={{}}
        isEmpty={false}
        isClose={true}
        isSelected={false}
        attributesOpen={false}
        childrenOpen={false}
        showSelected={false}
        showAttributesOpen={false}
        showChildrenOpen={false}
    />



export const Text = (props: {
    path: number[],
    text: string
}): JSX.Element =>
    <div className='text'>
        <Prefix
            path={props.path}
            opts={prefixOpts}
        />
        [<span className='text-body'>{props.text}</span>]
    </div>

export const CDATA = (props: {
    path: number[],
    cdata: string
}): JSX.Element =>
    <div className='cdata'>
        <Prefix
            path={props.path}
            opts={prefixOpts}
        />
        &lt;![CDATA[
        <span className='cdata-body'>{props.cdata}</span>
        ]]&gt;
    </div>

export const Comment = (props: {
    path: number[],
    comment: string
}): JSX.Element =>
    <div className='comment'>
        <Prefix
            path={props.path}
            opts={prefixOpts}
        />
        &lt;!--
        <span className='comment-body'>{props.comment}</span>
        --&gt;
    </div>

export const PI = (props: {
    path: number[],
    lang: string,
    body: string
}): JSX.Element =>
    <div className='pi'>
        <Prefix
            path={props.path}
            opts={prefixOpts}
        />
        &lt;?
        <span className='pi-lang'>{props.lang}</span>
        {" "}
        <span className='pi-body'>{props.body}</span>
        {" "}?&gt;
    </div>

export const Attributes = (props: {
    path: number[],
    attributes: AttributesType
}): JSX.Element | null => {
    return Object.keys(props.attributes).length > 0 ?
        <div>
            {Object.keys(props.attributes).map((a, i) => {
                return (
                    <span key={i}>
                        {i > 0 ? <br /> : null}
                        <Attribute
                            path={props.path}
                            name={a}
                            value={props.attributes[a]}
                        />
                    </span>
                )
            })}
        </div> :
        null
}

export const Attribute = (props: {
    path: number[],
    name: string,
    value: string
}): JSX.Element =>
    <span className='attribute'>
        <Prefix
            path={props.path}
            opts={prefixOpts}
        />
        {prefixOpts.attributePrefix}
        <NsName name={props.name} type='attribute' />
        =&quot;
        <span className='attribute-value'>{props.value}</span>
        &quot;
    </span>

export const Prefix = (props: {
    path: number[],
    opts: PrefixOpts
}): JSX.Element | null => {
    if (props.opts.showPrefix) {
        return (<span className="prefix">{getPrefixString(props.path, props.opts)}</span>)
    }
    else {
        return null
    }
}

const NsName = (props: { name: string, type: string }): JSX.Element => {
    const tagName = props.name.split(/:/)
    return tagName.length > 1 ?
        <>
            <span className={`${props.type}-ns`}>{tagName[0]}</span>
            :
            <span className={`${props.type}-name`}>{tagName[1]}</span>
        </>
        :
        <span className={`${props.type}-name`}>{tagName[0]}</span>
}

const ShowHideSwitch = (props: { on: string, off: string, hide: string, selected: SwitchStates, className: string }): JSX.Element => {
    let out = props.hide
    switch (props.selected) {
        case SwitchStates.OFF:
            out = props.off
            break;
        case SwitchStates.ON:
            out = props.on
    }
    return (
        <span className={props.className}>{out}</span>
    )
}

const getPrefixString = (path: number[], opts: PrefixOpts): string => {
    let out = ""
    const init = ""
    return path.reduce((out, p) => out + opts.charOn, init)
}