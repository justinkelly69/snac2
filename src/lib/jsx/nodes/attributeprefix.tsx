import { StyledConstants, StyledSpan } from '../styled'


export interface AttributePrefixArgs {
    color: string,
    prefix: string,
}

export const AttributePrefix = (props: AttributePrefixArgs): JSX.Element => {
    return (
        <>
            {' '}
            <StyledSpan.Span color={props.color}>
                {`${props.prefix}${StyledConstants.constants.ATTRIBUTE_PREFIX}`}
            </StyledSpan.Span>
        </>
    );
}