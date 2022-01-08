import React from 'react';
import { TextNodeType } from '../snac2/texts';

export interface SNACText {
    snac: TextNodeType,
    cssPrefix: string,
};

export const XText = (props:SNACText): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-text-display`}>
            {props.snac.T}
        </span>
    )
}