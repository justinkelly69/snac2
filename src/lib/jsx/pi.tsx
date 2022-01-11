import React from 'react';
import { PINodeType } from '../snac2/pis';
import { escapePI } from '../snac2/helpers';

export interface PIArgs {
    snac: PINodeType,
    cssMode: string,
    cssPrefix: string,
};

export const PI = (props: PIArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-pi-display-${props.cssMode}`}>
            <span className={`${props.cssPrefix}-pi-bracket-${props.cssMode}`}>
                &lt;?
            </span>
            <span className={`${props.cssPrefix}-pi-lang-${props.cssMode}`}>
                {props.snac.L}
            </span>
            {' '}
            <span className={`${props.cssPrefix}-pi-body-${props.cssMode}`}>
                {escapePI(props.snac.B)}
            </span>
            <span className={`${props.cssPrefix}-pi-bracket-${props.cssMode}`}>
                ?&gt;
            </span>
        </span>
    )
}