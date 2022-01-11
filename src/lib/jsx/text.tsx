import React from 'react';
import { TextNodeType } from '../snac2/texts';

export interface TextArgs {
    snac: TextNodeType,
    cssMode: string,
    cssPrefix: string,
};

export const Text = (props:TextArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-text-display-${props.cssMode}`}>
            {props.snac.T}
        </span>
    )
}