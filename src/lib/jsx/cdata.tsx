import React from 'react';
import { CDATANodeType } from '../snac2/cdata';

export interface SNACCDATA {
    snac: CDATANodeType,
    cssPrefix: string,
};

export const XCDATA = (props:SNACCDATA): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-cdata-display`}>
            &lt;[CDATA[
            {props.snac.D}
            ]]&gt;
        </span>
    )
}