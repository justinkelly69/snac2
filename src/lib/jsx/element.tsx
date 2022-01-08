import React from 'react';
import { AttributesNodeType } from '../snac2/attributes';
import { ChildNodeType, ElementNodeType } from '../snac2/elements';
import { TagType, XMLTag } from './elementTag';
import { Attributes } from './attributes';
import { getType } from '../snac2/helpers';
import { TextNodeType } from '../snac2/texts';
import { XText } from './text';
import { XCDATA } from './cdata';
import { CDATANodeType } from '../snac2/cdata';
import { XComment } from './comment';
import { CommentNodeType } from '../snac2/comments';
import { XPI } from './pi';
import { PINodeType } from '../snac2/pis';


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
            <XMLTag args={args} tagType={TagType.open} cssPrefix={props.cssPrefix} />
            {args.C.map((kid, index) => {
                console.log('C', JSON.stringify(kid, null, 4));
                switch (getType(kid)) {
                    case 'N':
                        const element = kid as ElementNodeType;
                        return <XElement key={index} snac={element} cssPrefix={props.cssPrefix} />;
                    case 'T':
                        const text = kid as TextNodeType;
                        return <XText key={index} snac={text} cssPrefix={props.cssPrefix} />;
                    case 'D':
                        const cdata = kid as CDATANodeType;
                        return <XCDATA key={index} snac={cdata} cssPrefix={props.cssPrefix} />;
                    case 'M':
                        const comment = kid as CommentNodeType;
                        return <XComment key={index} snac={comment} cssPrefix={props.cssPrefix} />;
                    case 'P':
                        const pi = kid as PINodeType;
                        return <XPI key={index} snac={pi} cssPrefix={props.cssPrefix} />;
                }
            })}
            <XMLTag args={args} tagType={TagType.close} cssPrefix={cssPrefix} />
        </div>
    );
}

export default XElement;