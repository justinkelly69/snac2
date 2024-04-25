import { useState } from 'react'

import {
    SNACItem,
    SNACElement,
    SNACText,
    SNACCDATA,
    SNACComment,
    SNACPINode,
    AttributesType,
    SwitchStates,
    SNACOpts,
    OnOffHiddenChars,
} from '../snac/types'

import { snacOpts } from "../snac/opts"

import {
    escapeCDATA,
    escapeComment,
    escapePIBody
} from '../snac/textutils'

import { getPrefixString } from '../snac/html'

import * as HTML from './html'

export const Prefix = (props: {
    path: number[],
    opts: SNACOpts
}): JSX.Element | null => {

    return props.opts.prefix_showPrefix ? (
        <HTML.Prefix
            prefix={
                getPrefixString(
                    props.path,
                    props.opts
                )
            }
        />
    ) :
        null
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
        <HTML.ShowHideSwitch
            {...props}
            out={out}
        />
    )
}

export const Tag = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    opts: SNACOpts,
    getChildren: Function,
    funcs: { [name: string]: Function }
}): JSX.Element => {

    const [isSelected, setSelected] = useState(props.node.q)
    const [isAttributesOpen, setAttributesOpen] = useState(props.node.a)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectedClassName = 'element'

    if (props.opts.xml_showSelected) {
        selectedClassName = isSelected ?
            'element selected' :
            'element'
    }

    let isEmpty = false
    if (props.node.C.length === 0) {
        isEmpty = true
    }

    return (
        <HTML.Div className={selectedClassName}>
            <OpenTag
                {...props}
                isEmpty={isEmpty}
                isSelected={isSelected}
                setSelected={setSelected}
                isAttributesOpen={isAttributesOpen}
                setAttributesOpen={setAttributesOpen}
                isChildrenOpen={isChildrenOpen}
                setChildrenOpen={setChildrenOpen}
            />

            {isChildrenOpen ?
                props.getChildren(
                    props.root,
                    props.node.C,
                    props.path,
                    props.funcs,
                    props.opts
                ) :
                props.opts.xml_ellipsis
            }

            {!isEmpty && props.opts.xml_showCloseTags ? (
                <CloseTag
                    {...props}
                    isEmpty={isEmpty}
                    isSelected={isSelected}
                    setSelected={setSelected}
                    isChildrenOpen={isChildrenOpen}
                    setChildrenOpen={setChildrenOpen}
                />
            ) :
                null
            }
        </HTML.Div>
    )
}

export const OpenTag = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    isEmpty: boolean,
    opts: SNACOpts,
    isSelected: boolean,
    setSelected: Function
    isAttributesOpen: boolean,
    setAttributesOpen: Function
    isChildrenOpen: boolean,
    setChildrenOpen: Function
}): JSX.Element => {

    let selectState = SwitchStates.HIDDEN
    let attributesOpenState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN
    let isEmpty = true

    if (props.opts.xml_showSelected) {
        selectState = props.isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    if (props.opts.xml_showAttributesOpen && Object.keys(props.node.A).length) {
        attributesOpenState = props.isAttributesOpen ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    if (!props.isEmpty) {
        if (props.opts.xml_showChildrenOpen) {
            childrenOpenState = props.isChildrenOpen ?
                SwitchStates.ON :
                SwitchStates.OFF
        }
        isEmpty = false
    }

    return (
        <>
            <ShowHideSwitch
                {...props}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={() => props.setSelected(!props.isSelected)}
            />

            <Prefix {...props} />

            <ShowHideSwitch
                {...props}
                selected={childrenOpenState}
                chars={props.opts.switch_elementChars}
                className='element-show-hide'
                openClose={() => props.setChildrenOpen(!props.isChildrenOpen)}
            />

            <HTML.OpenCaret isClose={false} />

            <NSTagName
                {...props}
                name={props.node.N}
                type='element'
            />

            {props.isAttributesOpen ?
                <Attributes
                    {...props}
                    attributes={props.node.A}
                /> :
                null
            }

            <HTML.CloseCaret isEmpty={isEmpty} />

            <ShowHideSwitch
                {...props}
                selected={attributesOpenState}
                chars={props.opts.switch_attributeChars}
                className='attributes-show-hide'
                openClose={() => props.setAttributesOpen(!props.isAttributesOpen)}
            />
        </>
    )
}

export const CloseTag = (props: {
    root: SNACItem[],
    node: SNACElement,
    path: number[],
    isEmpty: boolean,
    isSelected: boolean,
    setSelected: Function
    isChildrenOpen: boolean,
    setChildrenOpen: Function
    opts: SNACOpts,
}): JSX.Element | null => {

    let selectState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN

    if (props.opts.xml_showSelected) {
        selectState = props.isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    if (props.isEmpty) {
        if (props.opts.xml_showChildrenOpen) {
            childrenOpenState = props.isChildrenOpen ?
                SwitchStates.ON :
                SwitchStates.OFF
        }
    }

    return (
        <>
            {props.isChildrenOpen ? (
                <>
                    <ShowHideSwitch
                        {...props}
                        selected={selectState}
                        chars={props.opts.switch_selectChars}
                        className='selected-show-hide'
                        openClose={() => props.setSelected(!props.isSelected)}
                    />
                    <Prefix {...props} />
                    <ShowHideSwitch
                        {...props}
                        selected={childrenOpenState}
                        chars={props.opts.switch_elementChars}
                        className='element-show-hide'
                        openClose={() => props.setChildrenOpen(!props.isChildrenOpen)}
                    />
                </>
            ) :
                null
            }

            <HTML.OpenCaret isClose={true} />

            <NSTagName
                {...props}
                name={props.node.N}
                type='element'
            />

            <HTML.CloseCaret isEmpty={false} />
        </>
    )
}

const NSTagName = (props: {
    path: number[],
    name: string,
    type: string
}): JSX.Element => {

    return (
        <HTML.TagName
            {...props}
            className={props.type}
            separator={snacOpts.prefix_separator}
        />
    )
}

export const Attributes = (props: {
    path: number[],
    attributes: AttributesType,
    opts: SNACOpts
}): JSX.Element | null => {

    return Object.keys(props.attributes).length > 0 ? (
        <>
            <HTML.Div className='attributes'>
                {Object.keys(props.attributes).map((a, i) =>
                    <HTML.Span key={i} className="attribute">
                        <HTML.AttributePreSpace index={i} />
                        <Attribute
                            {...props}
                            name={a}
                            value={props.attributes[a]}
                        />
                    </HTML.Span>
                )}
            </HTML.Div>

            <AttributesPostSpacing
                {...props}
                A={props.attributes}
            />
        </>
    ) :
        null
}

export const Attribute = (props: {
    path: number[],
    name: string,
    value: string,
    opts: SNACOpts,
}): JSX.Element => {

    return (
        <HTML.Span className='attribute'>
            <Prefix {...props} />
            {props.opts.prefix_attributePrefix}
            <HTML.AttributeNSName
                {...props}
                className={'attribute'}
            />
            <HTML.AttributeValue {...props} />
        </HTML.Span>
    )
}

const AttributesPostSpacing = (props: {
    A: AttributesType,
    path: number[],
    opts: SNACOpts,
}): JSX.Element | null => {

    return Object.keys(props.A).length > 0 ? (
        <>
            {props.opts.prefix_spaceBefore}
            <Prefix {...props} />
            {props.opts.prefix_spaceAfter}
        </>
    ) :
        null
}

export const Text = (props: {
    root: SNACItem[],
    node: SNACText,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNACOpts,
}): JSX.Element => {

    const [isSelected, setSelected] = useState(props.node.q)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    let selectedClassName = 'text'

    if (props.showSelected) {
        selectState = isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF

        selectedClassName = isSelected ?
            'text selected' :
            'text'
    }
    if (props.showOpen) {
        openState = isChildrenOpen ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    let text = props.node.T
    if (!isChildrenOpen) {
        text = `${text.substring(0, props.opts.xml_trimTextLength)} ${props.opts.xml_ellipsis}`
    }

    return (
        <HTML.Div className={selectedClassName}>
            <ShowHideSwitch
                {...props}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={() => setSelected(!isSelected)}
            />

            <Prefix {...props} />

            {props.showOpen ?
                <ShowHideSwitch
                    {...props}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={() => setChildrenOpen(!isChildrenOpen)}
                /> :
                null
            }

            <HTML.Text
                path={props.path}
                text={text}
            />
        </HTML.Div>
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

    const [isSelected, setSelected] = useState(props.node.q)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    let selectedClassName = 'cdata'

    if (props.showSelected) {
        selectState = isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF

        selectedClassName = isSelected ?
            'cdata selected' :
            'cdata'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    let cdata = props.node.D
    if (!isChildrenOpen) {
        cdata = `${cdata.substring(0, props.opts.xml_trimCDATALength)} ${props.opts.xml_ellipsis}`
    }

    return (
        <HTML.Div className={selectedClassName}>
            <ShowHideSwitch
                {...props}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={() => setSelected(!isSelected)}
            />

            <Prefix {...props} />

            {props.showOpen ?
                <ShowHideSwitch
                    {...props}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={() => setChildrenOpen(!isChildrenOpen)}
                /> :
                null
            }

            <HTML.CDATA
                cdata={escapeCDATA(cdata)}
                path={props.path}
            />
        </HTML.Div>
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

    const [isSelected, setSelected] = useState(props.node.q)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    let selectedClassName = 'comment'

    if (props.showSelected) {
        selectState = isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF

        selectedClassName = isSelected ?
            'comment selected' :
            'comment'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    let comment = props.node.M
    if (!isChildrenOpen) {
        comment = `${comment.substring(0, props.opts.xml_trimCommentLength)} ${props.opts.xml_ellipsis}`
    }

    return (
        <HTML.Div className={selectedClassName}>
            <ShowHideSwitch
                {...props}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={() => setSelected(!isSelected)}
            />

            <Prefix {...props} />

            {props.showOpen ?
                <ShowHideSwitch
                    {...props}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={() => setChildrenOpen(!isChildrenOpen)}
                /> :
                null
            }

            <HTML.Comment
                comment={escapeComment(comment)}
                path={props.path}
            />
        </HTML.Div>
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

    const [isSelected, setSelected] = useState(props.node.q)
    const [isChildrenOpen, setChildrenOpen] = useState(props.node.o)

    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    let selectedClassName = 'pi'

    if (props.showSelected) {
        selectState = isSelected ?
            SwitchStates.ON :
            SwitchStates.OFF

        selectedClassName = isSelected ?
            'pi selected' :
            'pi'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SwitchStates.ON :
            SwitchStates.OFF
    }

    let body = props.node.B
    if (!isChildrenOpen) {
        body = `${props.opts.xml_ellipsis}`
    }

    return (
        <HTML.Div className={selectedClassName}>
            <ShowHideSwitch
                {...props}
                selected={selectState}
                chars={props.opts.switch_selectChars}
                className='selected-show-hide'
                openClose={() => setSelected(!isSelected)}
            />

            <Prefix {...props} />

            {props.showOpen ?
                <ShowHideSwitch
                    {...props}
                    selected={openState}
                    chars={props.opts.switch_elementChars}
                    className='element-show-hide'
                    openClose={() => setChildrenOpen(!isChildrenOpen)}
                /> :
                null
            }

            <HTML.PI
                language={props.node.L}
                body={escapePIBody(body)}
                path={props.path}
            />
        </HTML.Div>
    )
}
