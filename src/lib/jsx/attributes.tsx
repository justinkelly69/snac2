import React from 'react';
import { AttributesNodeType } from '../snac2/attributes';
import { Attribute } from './attribute';

export interface AttributesArgs {
    atts: AttributesNodeType,
    cssMode: string,
    cssPrefix: string,
}

export const Attributes = (props: AttributesArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-att-${props.cssMode}`}>
            {Object.keys(props.atts).map(ns => {
                return Object.keys(props.atts[ns]).map(n => {
                    return (
                        <Attribute key={`${ns}-${n}`}
                            ns={ns}
                            name={n}
                            value={props.atts[ns][n]}
                            cssMode={props.cssMode}
                            cssPrefix={props.cssPrefix}
                        />
                    );
                })
            })}
        </span>
    );
}
