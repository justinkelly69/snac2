import React, { useState } from 'react'
import { AttributesNodeType } from '../../snac2/attributes'
import { Attributes } from './attributes'
import { Prefix } from './prefix'
import { Span } from '../styled/span'
import { getColors } from '../styled/colors'
import { Block } from '../styled/block'
import { AttributesButton } from '../styled/button'
import constants from '../../snac2/constants'

export enum TagType {
    open,
    close,
    empty
}

export interface TagArgs {
    snac: {
        _: string
        S: string
        N: string
        A: AttributesNodeType
        a: boolean
        o: boolean
        q: boolean
    }
    prefix: string
    showTag: boolean
    showKids: boolean
    showHideKids: Function
    cssMode: string
    tagType: TagType
}

export const Tag = (props: TagArgs): JSX.Element => {
    const [selected, setSelected] = useState(props.snac.q)
    const [atts, showAtts] = useState(props.snac.a)
    //const [showKids1, showHideKids1] = useState(props.showKids)

    const colors = getColors(props.cssMode)

    return (
        <Block
            visible={props.showTag}
            selected={selected}
            Prop1={
                <Prefix
                    prefix={props.prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => {
                        setSelected(!selected)
                    }}
                    showKids={props.showKids}
                    showHideKids={props.showHideKids}
                />
            }
            Prop2={
                <Span color={colors.Node}>
                    &lt;
                    {props.tagType === TagType.close && (
                        <Span color={colors.NodeSlash}>{'/'}</Span>
                    )}
                    {props.snac.S !== '@' && (
                        <>
                            <Span color={colors.NS} fontWeight='bold'>
                                {props.snac.S}
                            </Span>
                            <Span color={colors.NodeColon}>:</Span>
                        </>
                    )}
                    <Span color={colors.Name} fontWeight='bold'>
                        {props.snac.N}
                    </Span>
                    {props.tagType !== TagType.close && (
                        <Block
                            visible={atts}
                            Prop1={<></>}
                            Prop2={
                                <Attributes
                                    _={props.snac._}
                                    prefix={props.prefix}
                                    atts={props.snac.A}
                                    cssMode={props.cssMode}
                                />
                            }
                        />
                    )}
                    {props.tagType === TagType.empty && (
                        <Span color={colors.NodeSlash}>{' /'}</Span>
                    )}
                    {atts ? `${constants.PREFIX_START}${props.prefix}` : null}&gt;
                    {props.tagType !== TagType.close && (
                        <AttributesButton
                            show={atts}
                            onClick={e => {
                                console.log('atts', atts)
                                showAtts(!atts)
                            }}
                        />
                    )}
                </Span>
            }
        />
    )
}
