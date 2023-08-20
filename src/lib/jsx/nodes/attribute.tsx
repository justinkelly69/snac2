import { StyledBlock, StyledColors, StyledSpan } from '../styled'
import { AttributePrefix } from './attributeprefix';


export interface AttributeArgs {
    _: string,
    name: string,
    value: string,
    cssMode: string,
    prefix: string,
}

export const Attribute = (props: AttributeArgs): JSX.Element => {

    const colors = StyledColors.getColors(props.cssMode);
    const colonIndex = props.name.indexOf(':')

    return (
        <StyledBlock.Block visible={true}
            Prop1={
                <AttributePrefix prefix={props.prefix} color={colors.AttributePrefix} />
            }
            Prop2={
                <StyledSpan.Span color={colors.Attribute}>
                    {colonIndex > -1 ? (
                        <>
                            <StyledSpan.Span color={colors.AttributeNS} fontWeight='bold'>{props.name.substring(0, colonIndex)}</StyledSpan.Span>
                            <StyledSpan.Span color={colors.AttributeColon}>:</StyledSpan.Span>
                            <StyledSpan.Span color={colors.AttributeName} fontWeight='bold'>{props.name.substring(colonIndex + 1)}</StyledSpan.Span>
                        </>
                    ) : (
                        <StyledSpan.Span color={colors.AttributeName} fontWeight='bold'>{props.name}</StyledSpan.Span>
                    )}

                    <StyledSpan.Span color={colors.AttributeEquals}>=</StyledSpan.Span>
                    <StyledSpan.Span color={colors.AttributeQuote}>&quot;</StyledSpan.Span>
                    <StyledSpan.Span color={colors.AttributeValue} fontWeight='bold'>{props.value}</StyledSpan.Span>
                    <StyledSpan.Span color={colors.AttributeQuote}>&quot;</StyledSpan.Span>
                </StyledSpan.Span>
            }
        />
    );
}
