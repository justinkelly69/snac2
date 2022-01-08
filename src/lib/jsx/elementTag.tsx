import React from 'react';
import { AttributesNodeType } from '../snac2/attributes';
import { Attributes } from './attributes';

export enum TagType {
    open, close, empty,
}

export interface SNACElementTag {
    args: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
    },
    cssPrefix: string,
    tagType: TagType,
}

export const XMLTag = (props: SNACElementTag): JSX.Element => {

    return (
        <span className={`${props.cssPrefix}-tag`}>
            &lt;
            {props.tagType === TagType.close &&
                <span className={`${props.cssPrefix}-backslash`}>/</span>
            }
            {props.args.S !== '@' &&
                <>
                    <span className={`${props.cssPrefix}-ns`}>{props.args.S}</span>
                    <span className={`${props.cssPrefix}-colon`}>:</span>
                </>
            }
            <span className={`${props.cssPrefix}-name`}>{props.args.N}</span>
            {props.tagType !== TagType.close &&
                <Attributes atts={props.args.A}  cssPrefix={props.cssPrefix} />
            }
            {props.tagType === TagType.empty &&
                <span className={`${props.cssPrefix}-backslash`}>{' /'}</span>
            }
            &gt;
        </span>
    );
}
