import { useState } from 'react'
import { SNACPi, SNACPrefix, SNACText } from '../../snac2'
import { StyledBlock, StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Prefix } from './prefix'


export interface PIArgs {
    snac: SNACPi.PINodeType
    cssMode: string
}

export const PI = (props: PIArgs): JSX.Element => {
    const [showPI, showHidePI] = useState(props.snac.o)
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
                    showKids={showPI}
                    showHideKids={e => showHidePI(!showPI)}
                />
            }
            Prop2={
                <StyledSpan.Span color={colors.PIBody}>
                    <StyledSpan.Span color={colors.PIHeading}>&lt;?</StyledSpan.Span>
                    <StyledSpan.Span color={colors.PILang}>{`${props.snac.L} `}</StyledSpan.Span>
                    {showPI
                        ? SNACPi.escapePI(props.snac.B)
                        : SNACPi.escapePI(SNACText.normalize(props.snac.B, StyledConstants.constants.PI_PREVIEW_LENGTH))}
                    <StyledSpan.Span color={colors.PIHeading}>?&gt;</StyledSpan.Span>
                </StyledSpan.Span>
            }
        />
    )
}
