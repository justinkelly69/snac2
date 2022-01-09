import React from 'react';
import { CDATANodeType } from '../snac2/cdata';

export interface CDATArgs {
    snac: CDATANodeType,
    cssPrefix: string,
};

export const CDATA = (props: CDATArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-cdata-display`}>
            <span className={`${props.cssPrefix}-cdata-bracket`}>
                &lt;[
                <span className={`${props.cssPrefix}-cdata-bracket-name`}>
                    CDATA
                </span>
                [
            </span>
            <span className={`${props.cssPrefix}-cdata-body`}>
                {props.snac.D}
            </span>
            <span className={`${props.cssPrefix}-cdata-bracket`}>
                ]]&gt;
            </span>
        </span>
    )
}