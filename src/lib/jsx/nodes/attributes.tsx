import React from 'react';
import { AttributesNodeType } from '../../snac2/attributes';
import { Attribute } from './attribute';
import { Span } from '../styled/span';
import { colors } from '../styled/colors';

export interface AttributesArgs {
    _:string,
    atts: AttributesNodeType,
    cssMode: string,
}

export const Attributes = (props: AttributesArgs): JSX.Element => {

    const c = colors['light'];

    return (
        <Span color={c.Attribute}>
            {Object.keys(props.atts).map(ns => {
                return Object.keys(props.atts[ns]).map(n => {
                    return (
                        <Attribute key={`${ns}-${n}`}
                            _={props._}
                            ns={ns}
                            name={n}
                            value={props.atts[ns][n]}
                            cssMode={props.cssMode}
                        />
                    );
                })
            })}
        +</Span>
    );
}
