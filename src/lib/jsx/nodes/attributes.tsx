import React from 'react';
import { AttributesNodeType } from '../../snac2/attributes';
import { Attribute } from './attribute';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';

export interface AttributesArgs {
    _: string,
    prefix: string,
    atts: AttributesNodeType,
    cssMode: string,
}

export const Attributes = (props: AttributesArgs): JSX.Element => {

    const colors = getColors(props.cssMode);

    return (
        <Span color={colors.Attribute}>
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
            {`${constants.PREFIX_START}${props.prefix}${constants.NEW_ATTRIBUTE_PREFIX}+`}
        </Span>
    );
}
