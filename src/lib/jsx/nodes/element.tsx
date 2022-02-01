import React, { useState } from 'react';
import { getType } from '../../snac2/helpers';
import { TagType, Tag, TagArgs } from './tag';
import { ChildNodeType, ElementNodeType } from '../../snac2/elements';
import { AttributesNodeType } from '../../snac2/attributes';
import { Text } from './text';
import { TextNodeType } from '../../snac2/texts';
import { CDATA } from './cdata';
import { CDATANodeType } from '../../snac2/cdata';
import { Comment } from './comment';
import { CommentNodeType } from '../../snac2/comments';
import { PI } from './pi';
import { PINodeType } from '../../snac2/pis';
import { Block } from '../styled/block';
import { Prefix, PrefixArgs } from './prefix';
import { getColors } from '../styled/colors';

interface ElementArgs {
    snac: {
        _: string,
        S: string,
        N: string,
        A: AttributesNodeType,
        C: Array<ChildNodeType>
    },
    cssMode: string,
    show?: boolean,
    showHide?: Function,
};

const Element = (props: ElementArgs): JSX.Element => {

    const [kids, showKids] = useState(true);

    const c = getColors(props.cssMode);

    return (
        <>
            <Tag
                show={true}
                showHide={showKids}
                snac={props.snac}
                tagType={TagType.open}
                cssMode={props.cssMode}
            />
            {props.snac.C.map((kid, index) => {
                switch (getType(kid)) {
                    case 'N':
                        const element = kid as ElementNodeType;
                        return (
                            <Element
                                key={index}
                                snac={element}
                                cssMode={props.cssMode}
                            />);
                    case 'T':
                        const text = kid as TextNodeType;
                        return (
                            <Block
                                key={index}
                                Prop1={<Prefix _={kid._} color={c.Prefix} show={true} showHide={showKids} />}
                                Prop2={<Text
                                    snac={text}
                                    cssMode={props.cssMode}
                                />}
                            />);
                    case 'D':
                        const cdata = kid as CDATANodeType;
                        return (
                            <Block
                                key={index}
                                Prop1={<Prefix _={kid._} color={c.Prefix} show={true} showHide={showKids} />}
                                Prop2={<CDATA
                                    snac={cdata}
                                    cssMode={props.cssMode}
                                />}
                            />);
                    case 'M':
                        const comment = kid as CommentNodeType;
                        return (
                            <Block
                                key={index}
                                Prop1={<Prefix _={kid._} color={c.Prefix} show={true} showHide={showKids} />}
                                Prop2={<Comment
                                    snac={comment}
                                    cssMode={props.cssMode}
                                />}
                            />);
                    case 'P':
                        const pi = kid as PINodeType;
                        return (
                            <Block
                                key={index}
                                Prop1={<Prefix _={kid._} color={c.Prefix} show={true} showHide={showKids} />}
                                Prop2={<PI
                                    snac={pi}
                                    cssMode={props.cssMode}
                                />}
                            />);
                    default:
                        return null;
                }
            })}
            <Tag
                show={true}
                showHide={showKids}
                snac={props.snac}
                tagType={TagType.close}
                cssMode={props.cssMode}
            />
        </>
    );
}

export default Element;