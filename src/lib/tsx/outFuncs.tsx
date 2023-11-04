import React, { Fragment, useState } from 'react'

import { SNACItem, SNACElement, SNACText, SNACCDATA, SNACComment, SNACPINode, AttributesType, SwitchStates, SNACOpts, OnOffHiddenChars } from '../snac/types'
import { escapeCDATA, escapeComment, escapePIBody } from '../snac/textutils'
import { findElement } from '../snac/snac'

export const Element = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    isNotEmpty: boolean,
    showSelected: boolean,
    showAttributesOpen: boolean,
    showChildrenOpen: boolean,
    opts: SNACOpts,
}): JSX.Element => { 
    const [isSelected, setSelected] = useState(props.node.q)
    const [isAttributesOpen, setAttributesOpen] = useState(props.node.a)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let attributesOpenState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN
    let closeSlash = "/"

    if (props.showSelected) {
        selectState = isSelected ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.showAttributesOpen && Object.keys(props.node.A).length) {
        attributesOpenState = isAttributesOpen ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.isNotEmpty) {
        if (props.showChildrenOpen) {
            childrenOpenState = isChildrenOpen ? SwitchStates.ON : SwitchStates.OFF
        }
        closeSlash = ""
    }
    return (
        <div className='element'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={e => setSelected(!isSelected)}
            />
            <Prefix path={props.path} opts={props.opts} />
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={childrenOpenState}
                chars={props.opts.switch_elementChars}
                className='element-show-hide'
                openClose={e => setChildrenOpen(!isChildrenOpen)}
            />
            &lt;
            <NsName name={props.node.N} type='element' />
            <>
                {isAttributesOpen ?
                    <>
                        <Attributes path={props.path} attributes={props.node.A} opts={props.opts} />
                        {Object.keys(props.node.A).length > 0 ?
                            <>
                                {props.opts.prefix_spaceBefore}
                                <Prefix path={props.path} opts={props.opts} />
                                {props.opts.prefix_spaceAfter}
                            </>
                            : null
                        }
                    </> :
                    null
                }
            </>
            {closeSlash}&gt;
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={attributesOpenState}
                chars={props.opts.switch_attributeChars}
                className='attributes-show-hide'
                openClose={e => setAttributesOpen(!isAttributesOpen)}
            />
        </div>
    )
}

export const OpenTag = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    isNotEmpty: boolean,
    showSelected: boolean,
    showAttributesOpen: boolean,
    showChildrenOpen: boolean,
    opts: SNACOpts,
}): JSX.Element => {

    const [isSelected, setSelected] = useState(props.node.q)
    const [isAttributesOpen, setAttributesOpen] = useState(props.node.a)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let attributesOpenState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN
    let closeSlash = "/"

    if (props.showSelected) {
        selectState = isSelected ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.showAttributesOpen && Object.keys(props.node.A).length) {
        attributesOpenState = isAttributesOpen ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.isNotEmpty) {
        if (props.showChildrenOpen) {
            childrenOpenState = isChildrenOpen ? SwitchStates.ON : SwitchStates.OFF
        }
        closeSlash = ""
    }

    return (
        <div className='element'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={e => setSelected(!isSelected)}
            />
            <Prefix path={props.path} opts={props.opts} />
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={childrenOpenState}
                chars={props.opts.switch_elementChars}
                className='element-show-hide'
                openClose={e => setChildrenOpen(!isChildrenOpen)}
            />
            &lt;
            <NsName name={props.node.N} type='element' />
            <>
                {isAttributesOpen ?
                    <>
                        <Attributes path={props.path} attributes={props.node.A} opts={props.opts} />
                        {Object.keys(props.node.A).length > 0 ?
                            <>
                                {props.opts.prefix_spaceBefore}
                                <Prefix path={props.path} opts={props.opts} />
                                {props.opts.prefix_spaceAfter}
                            </>
                            : null
                        }
                    </> :
                    null
                }
            </>
            {closeSlash}&gt;
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={attributesOpenState}
                chars={props.opts.switch_attributeChars}
                className='attributes-show-hide'
                openClose={e => setAttributesOpen(!isAttributesOpen)}
            />
        </div>
    )
}

export const CloseTag = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    showSelected: boolean,
    opts: SNACOpts,
}): JSX.Element | null => {
    if (!props.opts.xml_showCloseTags) {
        return null
    }
    let selectState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.node.q ? SwitchStates.ON : SwitchStates.OFF
    }
    const childrenOpenState = props.node.o ? SwitchStates.ON : SwitchStates.OFF
    return (
        <div className='element'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={f => f}
            />
            <Prefix path={props.path} opts={props.opts} />
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={childrenOpenState}
                chars={props.opts.switch_elementChars}
                className='element-show-hide'
                openClose={f => f}
            />
            &lt;/
            <NsName name={props.node.N} type='element' />
            &gt;
        </div>
    )
}

export const Text = (props: {
    root: SNACItem[],
    node: SNACText,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNACOpts,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.node.q ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.node.o ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='text'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={f => f}
            />
            <Prefix path={props.path} opts={props.opts} />
            [{props.showOpen ?
                <ShowHideSwitch
                    root={props.root}
                    path={props.path}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={f => f}
                /> :
                null
            }]
            <span className='text-body'>{props.node.T}</span>
        </div>
    )
}

export const CDATA = (props: {
    root: SNACItem[],
    node: SNACCDATA,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNACOpts,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.node.q ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.node.o ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='cdata'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={f => f}
            />
            <Prefix path={props.path} opts={props.opts} />
            [{props.showOpen ?
                <ShowHideSwitch
                    root={props.root}
                    path={props.path}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={f => f}
                /> :
                null
            }]
            &lt;![CDATA[
            <span className='cdata-body'>{escapeCDATA(props.node.D)}</span>
            ]]&gt;
        </div>
    )
}

export const Comment = (props: {
    root: SNACItem[],
    node: SNACComment,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNACOpts,
}): JSX.Element | null => {
    if (!props.opts.xml_allowComments) {
        return null
    }
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.node.q ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.node.o ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='comment'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={f => f}
            />
            <Prefix path={props.path} opts={props.opts} />
            [{props.showOpen ?
                <ShowHideSwitch
                    root={props.root}
                    path={props.path}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={f => f}
                /> :
                null
            }]
            &lt;!--
            <span className='comment-body'>{escapeComment(props.node.M)}</span>
            --&gt;
        </div>
    )
}

export const PI = (props: {
    root: SNACItem[],
    node: SNACPINode,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNACOpts,
}): JSX.Element | null => {
    if (!props.opts.xml_allowPIs) {
        return null
    }
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.node.q ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.node.o ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='pi'>
            <ShowHideSwitch
                root={props.root}
                path={props.path}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={f => f}
            />
            <Prefix path={props.path} opts={props.opts} />
            [{props.showOpen ?
                <ShowHideSwitch
                    root={props.root}
                    path={props.path}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={f => f}
                /> :
                null
            }]
            &lt;?
            <span className='pi-lang'>{props.node.L}</span>
            {" "}
            <span className='pi-body'>{escapePIBody(props.node.B)}</span>
            {" "}?&gt;
        </div>
    )
}
export const Attributes = (props: {
    path: number[],
    attributes: AttributesType,
    opts: SNACOpts
}): JSX.Element | null => {
    return Object.keys(props.attributes).length > 0 ?
        <div>
            {Object.keys(props.attributes).map((a, i) => {
                return (
                    <span key={i}>
                        {i > 0 ? <br /> : null}
                        <Attribute path={props.path} name={a} value={props.attributes[a]} opts={props.opts} />
                    </span>
                )
            })}
        </div> :
        null
}

export const Attribute = (props: {
    path: number[],
    name: string,
    value: string,
    opts: SNACOpts
}): JSX.Element =>
    <span className='attribute'>
        <Prefix path={props.path} opts={props.opts} />
        {props.opts.prefix_attributePrefix}
        <NsName name={props.name} type='attribute' />
        =&quot;
        <span className='attribute-value'>{props.value}</span>
        &quot;
    </span>

export const Prefix = (props: {
    path: number[],
    opts: SNACOpts
}): JSX.Element | null => {
    if (props.opts.prefix_showPrefix) {
        return (<span className="prefix">{getPrefixString(props.path, props.opts)}</span>)
    }
    else {
        return null
    }
}

const getPrefixString = (path: number[], opts: SNACOpts): string => {
    const init = ""
    return path.reduce((out, p) => out + opts.prefix_charOn, init)
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

const ShowHideSwitch = (props:
    {
        root: SNACItem[],
        path: number[],
        chars: OnOffHiddenChars,
        selected: SwitchStates,
        className: string
        openClose: Function
    }): JSX.Element => {
    let out = props.chars.hidden
    switch (props.selected) {
        case SwitchStates.OFF:
            out = props.chars.on
            break;
        case SwitchStates.ON:
            out = props.chars.off
    }
    return (
        <span className={props.className} onClick={e => props.openClose()}>{out}</span>
    )
}

