import React from 'react';
import { AttributesNodeType } from '../snac2/attributes';
import { Attribute } from './attribute';

export interface SNACAttributesTag {
    atts: AttributesNodeType,
    cssPrefix: string,
}

export const Attributes = (props: SNACAttributesTag): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-att`}>
            {Object.keys(props.atts).map(ns => {
                return Object.keys(props.atts[ns]).map(n => {
                    return (
                        <Attribute key={`${ns}-${n}`}
                            ns={ns}
                            name={n}
                            value={props.atts[ns][n]}
                            cssPrefix={props.cssPrefix}
                        />
                    );
                })
            })}
        </span>
    );
}
