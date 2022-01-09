import React from 'react';
import { PINodeType } from '../snac2/pis';

export interface PIArgs {
    snac: PINodeType,
    cssPrefix: string,
};

export const PI = (props: PIArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-pi-display`}>
            <span className={`${props.cssPrefix}-pi-bracket`}>
                &lt;?
            </span>
            <span className={`${props.cssPrefix}-pi-lang`}>
                {props.snac.L}
            </span>
            {' '}
            <span className={`${props.cssPrefix}-pi-body`}>
                {props.snac.B}
            </span>
            <span className={`${props.cssPrefix}-pi-bracket`}>
                ?&gt;
            </span>
        </span>
    )
}