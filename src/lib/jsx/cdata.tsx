import React from 'react';
import { CDATANodeType } from '../snac2/cdata';
import { escapeCDATA } from '../snac2/helpers';

export interface CDATArgs {
    snac: CDATANodeType,
    cssMode: string,
    cssPrefix: string,
};

export const CDATA = (props: CDATArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-cdata-display-${props.cssMode}`}>
            <span className={`${props.cssPrefix}-cdata-bracket-${props.cssMode}`}>
                &lt;![
                <span className={`${props.cssPrefix}-cdata-bracket-name-${props.cssMode}`}>
                    CDATA
                </span>
                [
            </span>
            <span className={`${props.cssPrefix}-cdata-body-${props.cssMode}`}>
                {escapeCDATA(props.snac.D)}
            </span>
            <span className={`${props.cssPrefix}-cdata-bracket-${props.cssMode}`}>
                ]]&gt;
            </span>
        </span>
    )
}