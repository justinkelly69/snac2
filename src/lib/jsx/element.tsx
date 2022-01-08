import React from 'react';
import { AttributesNodeType } from '../snac2/attributes';
import { ChildNodeType } from '../snac2/elements';
import {TagType, XMLTag} from './elementTag';
import { Attributes } from './attributes';

interface SNACElement {
    snac: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
        C: Array<ChildNodeType>
    }
    cssPrefix: string,
};

const XElement = (props: SNACElement): JSX.Element => {
    // console.log('props:', JSON.stringify(props.snac));

    const args = props.snac;
    const cssPrefix = props.cssPrefix;

    return (
        <div>
            <XMLTag args={args} tagType={TagType.open} cssPrefix={cssPrefix} />
            <XMLTag args={args} tagType={TagType.close} cssPrefix={cssPrefix} />
            <XMLTag args={args} tagType={TagType.empty} cssPrefix={cssPrefix} />
        </div>
    );
}

export default XElement;