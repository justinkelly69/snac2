import React from 'react';
import { TextNodeType } from '../snac2/texts';

export interface TextArgs {
    snac: TextNodeType,
    cssPrefix: string,
};

export const Text = (props:TextArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-text-display`}>
            {props.snac.T}
        </span>
    )
}