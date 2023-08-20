import React, { useState } from 'react'
import { PINodeType, escapePI } from '../../snac2/pi'
import { Block } from '../styled/block'
import { Span } from '../styled/span'
import { Prefix } from './prefix'
import { getColors } from '../styled/colors'
import constants from '../../snac2/constants'
import { normalize } from '../../snac2/textprocessor'
import { getPrefix } from '../../snac2/prefix'

export interface PIArgs {
    snac: PINodeType
    cssMode: string
}

export const PI = (props: PIArgs): JSX.Element => {
    const [showPI, showHidePI] = useState(props.snac.o)
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
                    selectNode={e => setSelected(!selected)}
                    showKids={showPI}
                    showHideKids={e => showHidePI(!showPI)}
                />
            }
            Prop2={
                <Span color={colors.PIBody}>
                    <Span color={colors.PIHeading}>&lt;?</Span>
                    <Span color={colors.PILang}>{`${props.snac.L} `}</Span>
                    {showPI
                        ? escapePI(props.snac.B)
                        : escapePI(normalize(props.snac.B, constants.PI_PREVIEW_LENGTH))}
                    <Span color={colors.PIHeading}>?&gt;</Span>
                </Span>
            }
        />
    )
}
