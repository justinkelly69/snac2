import { useState } from 'react'

import * as SNAC from '../snac/types'
import * as HTML from './html'
import * as TEXT from '../snac/textutils'

import { snacOpts } from '../snac/opts'
import { getPrefixString } from '../snac/html'

export const Prefix = (props: {
    path: number[],
    opts: SNAC.SNACOpts
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
        root: SNAC.SNACItem[],
        path: number[],
        chars: SNAC.OnOffHiddenChars,
        selected: SNAC.SwitchStates,
        className: string
        openClose: Function
    }): JSX.Element => {

    let out = props.chars.hidden

    switch (props.selected) {
        case SNAC.SwitchStates.OFF:
            out = props.chars.on
            break;

        case SNAC.SwitchStates.ON:
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
    root: SNAC.SNACItem[],
    node: SNAC.SNACElement,
    path: number[],
    opts: SNAC.SNACOpts,
    getChildren: Function,
    funcs: { [name: string]: Function }
}): JSX.Element => {

    const [isSelected, setSelected] = useState(false)
    const [isAttributesOpen, setAttributesOpen] = useState(true)
    const [isChildrenOpen, setChildrenOpen] = useState(true)

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
    root: SNAC.SNACItem[],
    node: SNAC.SNACElement,
    path: number[],
    isEmpty: boolean,
    opts: SNAC.SNACOpts,
    isSelected: boolean,
    setSelected: Function
    isAttributesOpen: boolean,
    setAttributesOpen: Function
    isChildrenOpen: boolean,
    setChildrenOpen: Function
}): JSX.Element => {

    let selectState = SNAC.SwitchStates.HIDDEN
    let attributesOpenState = SNAC.SwitchStates.HIDDEN
    let childrenOpenState = SNAC.SwitchStates.HIDDEN
    let isEmpty = true

    if (props.opts.xml_showSelected) {
        selectState = props.isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
    }

    if (props.opts.xml_showAttributesOpen && Object.keys(props.node.A).length) {
        attributesOpenState = props.isAttributesOpen ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
    }

    if (!props.isEmpty) {
        if (props.opts.xml_showChildrenOpen) {
            childrenOpenState = props.isChildrenOpen ?
                SNAC.SwitchStates.ON :
                SNAC.SwitchStates.OFF
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
    root: SNAC.SNACItem[],
    node: SNAC.SNACElement,
    path: number[],
    isEmpty: boolean,
    isSelected: boolean,
    setSelected: Function
    isChildrenOpen: boolean,
    setChildrenOpen: Function
    opts: SNAC.SNACOpts,
}): JSX.Element | null => {

    let selectState = SNAC.SwitchStates.HIDDEN
    let childrenOpenState = SNAC.SwitchStates.HIDDEN

    if (props.opts.xml_showSelected) {
        selectState = props.isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
    }

    if (props.isEmpty) {
        if (props.opts.xml_showChildrenOpen) {
            childrenOpenState = props.isChildrenOpen ?
                SNAC.SwitchStates.ON :
                SNAC.SwitchStates.OFF
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
    attributes: SNAC.AttributesType,
    opts: SNAC.SNACOpts
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
    opts: SNAC.SNACOpts,
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
    A: SNAC.AttributesType,
    path: number[],
    opts: SNAC.SNACOpts,
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
    root: SNAC.SNACItem[],
    node: SNAC.SNACText,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNAC.SNACOpts,
}): JSX.Element => {

    const [isSelected, setSelected] = useState(false)
    const [isChildrenOpen, setChildrenOpen] = useState(true)

    let selectState = SNAC.SwitchStates.HIDDEN
    let openState = SNAC.SwitchStates.HIDDEN
    let selectedClassName = 'text'

    if (props.showSelected) {
        selectState = isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF

        selectedClassName = isSelected ?
            'text selected' :
            'text'
    }
    if (props.showOpen) {
        openState = isChildrenOpen ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
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
    root: SNAC.SNACItem[],
    node: SNAC.SNACCDATA,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNAC.SNACOpts,
}): JSX.Element => {

    const [isSelected, setSelected] = useState(false)
    const [isChildrenOpen, setChildrenOpen] = useState(true)

    let selectState = SNAC.SwitchStates.HIDDEN
    let openState = SNAC.SwitchStates.HIDDEN
    let selectedClassName = 'cdata'

    if (props.showSelected) {
        selectState = isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF

        selectedClassName = isSelected ?
            'cdata selected' :
            'cdata'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
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
                cdata={TEXT.escapeCDATA(cdata)}
                path={props.path}
            />
        </HTML.Div>
    )
}

export const Comment = (props: {
    root: SNAC.SNACItem[],
    node: SNAC.SNACComment,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNAC.SNACOpts,
}): JSX.Element | null => {

    const [isSelected, setSelected] = useState(false)
    const [isChildrenOpen, setChildrenOpen] = useState(true)

    let selectState = SNAC.SwitchStates.HIDDEN
    let openState = SNAC.SwitchStates.HIDDEN
    let selectedClassName = 'comment'

    if (props.showSelected) {
        selectState = isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF

        selectedClassName = isSelected ?
            'comment selected' :
            'comment'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
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
                comment={TEXT.escapeComment(comment)}
                path={props.path}
            />
        </HTML.Div>
    )
}

export const PI = (props: {
    root: SNAC.SNACItem[],
    node: SNAC.SNACPINode,
    path: number[],
    showSelected: boolean,
    showOpen: boolean,
    opts: SNAC.SNACOpts,
}): JSX.Element | null => {

    const [isSelected, setSelected] = useState(false)
    const [isChildrenOpen, setChildrenOpen] = useState(true)

    let selectState = SNAC.SwitchStates.HIDDEN
    let openState = SNAC.SwitchStates.HIDDEN
    let selectedClassName = 'pi'

    if (props.showSelected) {
        selectState = isSelected ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF

        selectedClassName = isSelected ?
            'pi selected' :
            'pi'
    }

    if (props.showOpen) {
        openState = isChildrenOpen ?
            SNAC.SwitchStates.ON :
            SNAC.SwitchStates.OFF
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
                body={TEXT.escapePIBody(body)}
                path={props.path}
            />
        </HTML.Div>
    )
}
