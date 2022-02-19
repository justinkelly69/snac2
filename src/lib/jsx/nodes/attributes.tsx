import React from 'react';
import { AttributesNodeType } from '../../snac2/attributes';
import { Attribute } from './attribute';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';
import { getPrefix } from '../../snac2/helpers';
import constants from '../../snac2/constants';

export interface AttributesArgs {
    _: string,
    atts: AttributesNodeType,
    cssMode: string,
}

export const Attributes = (props: AttributesArgs): JSX.Element => {

    const colors = getColors(props.cssMode);
    const prefix = getPrefix(props._)

    return (
        <Span color={colors.Attribute}>
            {Object.keys(props.atts).map(ns => {
                return Object.keys(props.atts[ns]).map(n => {
                    return (
                        <Attribute key={`${ns}-${n}`}
                            _={props._}
                            ns={ns}
                            name={n}
                            value={props.atts[ns][n]}
                            cssMode={props.cssMode}
                            prefix={prefix}
                        />
                    );
                })
            })}
            {`${constants.PREFIX_START}${prefix}${constants.NEW_ATTRIBUTE_PREFIX}+`}
        </Span>
    );
}
