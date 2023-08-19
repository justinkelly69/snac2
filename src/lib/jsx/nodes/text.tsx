import React, { useState } from 'react'
import { TextNodeType } from '../../snac2/text'
import { Block } from '../styled/block'
import { Span } from '../styled/span'
import { Prefix } from './prefix'
import { getColors } from '../styled/colors'
import constants from '../../snac2/constants'
import { normalize } from '../../snac2/textprocessor'
import { getPrefix } from '../../snac2/prefix'

export interface TextArgs {
    snac: TextNodeType
    cssMode: string
}

export const Text = (props: TextArgs): JSX.Element => {
    const [showText, showHideText] = useState(props.snac.o)
    const [selected, setSelected] = useState(props.snac.q)
    const colors = getColors(props.cssMode)
    const prefix = getPrefix(props.snac._)

    return (
        <Block
            visible={true}
            selected={selected}
            Prop1={
                <Prefix
                    prefix={prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => {
                        setSelected(!selected)
                        console.log(`selected is now ${selected}`)
                    }}
                    showKids={showText}
                    showHideKids={e => {
                        showHideText(!showText)
                        console.log(`showText is now ${showText}`)
                    }}
                />
            }
            Prop2={
                <Span color={colors.Text}>
                    {showText
                        ? `[${props.snac.T}]`
                        : `[${normalize(props.snac.T, constants.TEXT_PREVIEW_LENGTH)}]`}
                </Span>
            }
        />
    )
}
