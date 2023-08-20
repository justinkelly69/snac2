import { useState } from 'react'
import { SNACAttributes } from '../../snac2'
import { StyledBlock, StyledButton, StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Attributes } from './attributes'
import { Prefix } from './prefix'


export enum TagType {
    open,
    close,
    empty
}

export interface TagArgs {
    snac: {
        _: string
        N: string
        A: SNACAttributes.AttributesNodeType
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
    const colonIndex = props.snac.N.indexOf(':')
    const colors = StyledColors.getColors(props.cssMode)

    return (
        <StyledBlock.Block
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
                <StyledSpan.Span color={colors.Node}>
                    &lt;
                    {props.tagType === TagType.close && (
                        <StyledSpan.Span color={colors.NodeSlash}>{'/'}</StyledSpan.Span>
                    )}
                    {colonIndex > -1 ? (
                        <>
                            <StyledSpan.Span color={colors.NS} fontWeight='bold'>
                                {props.snac.N.substring(0, colonIndex)}
                            </StyledSpan.Span>
                            <StyledSpan.Span color={colors.NodeColon}>:</StyledSpan.Span>
                            <StyledSpan.Span color={colors.Name} fontWeight='bold'>
                                {props.snac.N.substring(colonIndex + 1)}
                            </StyledSpan.Span>
                        </>
                    ) : (
                        <StyledSpan.Span color={colors.Name} fontWeight='bold'>
                            {props.snac.N}
                        </StyledSpan.Span>
                    )}

                    {props.tagType !== TagType.close && (
                        <StyledBlock.Block
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
                        <StyledSpan.Span color={colors.NodeSlash}>{' /'}</StyledSpan.Span>
                    )}
                    {atts ? `${StyledConstants.constants.PREFIX_START}${props.prefix}` : null}&gt;
                    {props.tagType !== TagType.close && (
                        <StyledButton.AttributesButton
                            show={atts}
                            onClick={e => showAtts(!atts)}
                        />
                    )}
                </StyledSpan.Span>
            }
        />
    )
}
