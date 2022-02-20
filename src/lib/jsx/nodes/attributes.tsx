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
            {Object.keys(props.atts).map(ns => {
                return Object.keys(props.atts[ns]).map(n => {
                    return (
                        <Attribute key={`${ns}-${n}`}
                            _={props._}
                            ns={ns}
                            name={n}
                            value={props.atts[ns][n]}
                            cssMode={props.cssMode}
                            prefix={props.prefix}
                        />
                    );
                })
            })}
            {`${constants.PREFIX_START}${props.prefix}${constants.NEW_ATTRIBUTE_PREFIX}+`}
        </Span>
    );
}
