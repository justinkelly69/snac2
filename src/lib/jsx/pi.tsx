import React from 'react';
import { PINodeType } from '../snac2/pis';

export interface SNACPI {
    snac: PINodeType,
    cssPrefix: string,
};

export const XPI = (props:SNACPI): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-pi-display`}>
            &lt;?
            {props.snac.L}
            {props.snac.B}
            ?&gt;
        </span>
    )
}