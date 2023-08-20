import { useState } from 'react'
import { SNACPrefix, SNACText } from '../../snac2'
import { StyledBlock, StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Prefix } from './prefix'


export interface TextArgs {
    snac: SNACText.TextNodeType
    cssMode: string
}

export const Text = (props: TextArgs): JSX.Element => {
    const [showText, showHideText] = useState(props.snac.o)
    const [selected, setSelected] = useState(props.snac.q)
    const colors = StyledColors.getColors(props.cssMode)
    const prefix = SNACPrefix.getPrefix(props.snac._, StyledConstants.constants.PREFIX_START, StyledConstants.constants.PREFIX_ON, StyledConstants.constants.PREFIX_END)

    return (
        <StyledBlock.Block
            visible={true}
            selected={selected}
            Prop1={
                <Prefix
                    prefix={prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => setSelected(!selected)}
                    showKids={showText}
                    showHideKids={e => showHideText(!showText)}
                />
            }
            Prop2={
                <StyledSpan.Span color={colors.Text}>
                    {showText
                        ? `[${props.snac.T}]`
                        : `[${SNACText.normalize(props.snac.T, StyledConstants.constants.TEXT_PREVIEW_LENGTH)}]`}
                </StyledSpan.Span>
            }
        />
    )
}
