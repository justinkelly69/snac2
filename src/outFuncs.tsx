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

export const OpenTag = (props: {
    path: number[],
    name: string,
    attributes: AttributesType,
    isSelected: boolean,
    isNotEmpty: boolean,
    attributesOpen: boolean,
    childrenOpen: boolean,
    showSelected: boolean,
    showAttributesOpen: boolean,
    showChildrenOpen: boolean,
}): JSX.Element => {

    let selectState = SwitchStates.HIDDEN
    let attributesOpenState = SwitchStates.HIDDEN
    let childrenOpenState = SwitchStates.HIDDEN
    let closeSlash = "/"

    if (props.showSelected) {
        selectState = props.isSelected ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.showAttributesOpen && Object.keys(props.attributes).length) {
        attributesOpenState = props.attributesOpen ? SwitchStates.ON : SwitchStates.OFF
    }

    if (props.isNotEmpty) {
        if (props.showChildrenOpen) {
            childrenOpenState = props.childrenOpen ? SwitchStates.ON : SwitchStates.OFF
        }
        closeSlash = ""
    }

    return (
        <div className='element'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />
            <Prefix path={props.path} opts={prefixOpts} />

            <ShowHideSwitch selected={childrenOpenState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                hide={switchOpts.elementHide} className='element-show-hide' />

            &lt;
            <NsName name={props.name} type='element' />
            <>
                <Attributes
                    path={props.path}
                    attributes={props.attributes}
                />
                {Object.keys(props.attributes).length > 0 ?
                    <>
                        {" "}
                        <Prefix
                            path={props.path}
                            opts={prefixOpts}
                        />
                        {" "}
                    </>
                    : null
                }
            </>
            {closeSlash}&gt;
            <ShowHideSwitch selected={attributesOpenState} off={switchOpts.attributesOpen} on={switchOpts.attributesClose}
                hide={switchOpts.attributesHide} className='attributes-show-hide' />
        </div>
    )
}

export const CloseTag = (props: {
    path: number[],
    name: string,
    isSelected: boolean,
    showSelected: boolean,
}): JSX.Element => {
    return (
        <div className='element'>
            {switchOpts.selectHide}
            <Prefix path={props.path} opts={prefixOpts} />
            {switchOpts.selectHide}
            &lt;/
            <NsName name={props.name} type='element' />
            &gt;
        </div>
    )
}

export const Text = (props: {
    path: number[],
    text: string,
    isSelected: boolean,
    showSelected: boolean,
    isOpen: boolean,
    showOpen: boolean,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.isSelected ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.isOpen ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='text'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />
            <Prefix
                path={props.path}
                opts={prefixOpts}
            />
            [{props.showOpen ?
                <ShowHideSwitch selected={openState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                    hide={switchOpts.elementHide} className='element-show-hide' /> :
                null
            }]
            <span className='text-body'>{props.text}</span>
        </div>
    )
}

export const CDATA = (props: {
    path: number[],
    cdata: string,
    isSelected: boolean,
    showSelected: boolean,
    isOpen: boolean,
    showOpen: boolean,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.isSelected ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.isOpen ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='cdata'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />
            <Prefix
                path={props.path}
                opts={prefixOpts}
            />
            [{props.showOpen ?
                <ShowHideSwitch selected={openState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                    hide={switchOpts.elementHide} className='element-show-hide' /> :
                null
            }]
            &lt;![CDATA[
            <span className='cdata-body'>{props.cdata}</span>
            ]]&gt;
        </div>
    )
}

export const Comment = (props: {
    path: number[],
    comment: string,
    isSelected: boolean,
    showSelected: boolean,
    isOpen: boolean,
    showOpen: boolean,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.isSelected ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.isOpen ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='comment'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />
            <Prefix
                path={props.path}
                opts={prefixOpts}
            />
            [{props.showOpen ?
                <ShowHideSwitch selected={openState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                    hide={switchOpts.elementHide} className='element-show-hide' /> :
                null
            }]
            &lt;!--
            <span className='comment-body'>{props.comment}</span>
            --&gt;
        </div>
    )
}
export const PI = (props: {
    path: number[],
    lang: string,
    body: string,
    isSelected: boolean,
    showSelected: boolean,
    isOpen: boolean,
    showOpen: boolean,
}): JSX.Element => {
    let selectState = SwitchStates.HIDDEN
    let openState = SwitchStates.HIDDEN
    if (props.showSelected) {
        selectState = props.isSelected ? SwitchStates.ON : SwitchStates.OFF
    }
    if (props.showOpen) {
        openState = props.isOpen ? SwitchStates.ON : SwitchStates.OFF
    }
    return (
        <div className='pi'>
            <ShowHideSwitch selected={selectState} off={switchOpts.selectOff} on={switchOpts.selectOn}
                hide={switchOpts.selectHide} className='selected-show-hide' />
            <Prefix
                path={props.path}
                opts={prefixOpts}
            />
            [{props.showOpen ?
                <ShowHideSwitch selected={openState} off={switchOpts.elementOpen} on={switchOpts.elementClose}
                    hide={switchOpts.elementHide} className='element-show-hide' /> :
                null
            }]
            &lt;?
            <span className='pi-lang'>{props.lang}</span>
            {" "}
            <span className='pi-body'>{props.body}</span>
            {" "}?&gt;
        </div>
    )
}
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