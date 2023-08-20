import { SNACAttributes } from '../../snac2'
import { StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Attribute } from './attribute';


export interface AttributesArgs {
    _: string,
    prefix: string,
    atts: SNACAttributes.AttributesNodeType,
    cssMode: string,
}

export const Attributes = (props: AttributesArgs): JSX.Element => {

    const colors = StyledColors.getColors(props.cssMode);

    return (
        <StyledSpan.Span color={colors.Attribute}>
            {Object.keys(props.atts).map(n => {
                return (
                    <Attribute key={`${n}`}
                        _={props._}
                        name={n}
                        value={props.atts[n]}
                        cssMode={props.cssMode}
                        prefix={props.prefix}
                    />
                );
            })}
            {`${StyledConstants.constants.PREFIX_START}${props.prefix}${StyledConstants.constants.NEW_ATTRIBUTE_PREFIX}+`}
        </StyledSpan.Span>
    );
}
