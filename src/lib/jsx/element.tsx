import React from 'react';
import { getType } from '../snac2/helpers';
import { TagType, Tag } from './tag';
import { ChildNodeType, ElementNodeType } from '../snac2/elements';
import { AttributesNodeType } from '../snac2/attributes';
import { Text } from './text';
import { TextNodeType } from '../snac2/texts';
import { CDATA } from './cdata';
import { CDATANodeType } from '../snac2/cdata';
import { Comment } from './comment';
import { CommentNodeType } from '../snac2/comments';
import { PI } from './pi';
import { PINodeType } from '../snac2/pis';

interface ElementArgs {
    snac: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
        C: Array<ChildNodeType>
    }
    cssPrefix: string,
};

const Element = (props: ElementArgs): JSX.Element => {
    const args = props.snac;
    const cssPrefix = props.cssPrefix;

    return (
        <div>
            <Tag args={args} tagType={TagType.open} cssPrefix={props.cssPrefix} />
            {args.C.map((kid, index) => {
                console.log('C', JSON.stringify(kid, null, 4));
                switch (getType(kid)) {
                    case 'N':
                        const element = kid as ElementNodeType;
                        return <Element key={index} snac={element} cssPrefix={props.cssPrefix} />;
                    case 'T':
                        const text = kid as TextNodeType;
                        return <Text key={index} snac={text} cssPrefix={props.cssPrefix} />;
                    case 'D':
                        const cdata = kid as CDATANodeType;
                        return <CDATA key={index} snac={cdata} cssPrefix={props.cssPrefix} />;
                    case 'M':
                        const comment = kid as CommentNodeType;
                        return <Comment key={index} snac={comment} cssPrefix={props.cssPrefix} />;
                    case 'P':
                        const pi = kid as PINodeType;
                        return <PI key={index} snac={pi} cssPrefix={props.cssPrefix} />;
                    default:
                        return null;
                }
            })}
            <Tag args={args} tagType={TagType.close} cssPrefix={cssPrefix} />
        </div>
    );
}

export default Element;