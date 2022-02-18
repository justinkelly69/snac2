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
        C: Array<ChildNodeType>,
        a: boolean,
        o: boolean,
        q: boolean
    },
    cssMode: string,
    show: boolean,
    showHide?: Function,
};

const Element = (props: ElementArgs): JSX.Element => {

    const [showKids, showHideKids] = useState(props.snac.o);

    const c = getColors(props.cssMode);

    return (
        <>
            <Tag
                show={props.show}
                showHide={showHideKids}
                snac={props.snac}
                tagType={TagType.open}
                cssMode={props.cssMode}
            />
            {showKids && props.snac.C.map((kid, index) => {
                switch (getType(kid)) {
                    case 'N':
                        const element = kid as ElementNodeType;
                        return (
                            <Element
                                show={showKids}
                                key={index}
                                snac={element}
                                cssMode={props.cssMode}
                            />);
                    case 'T':
                        const text = kid as TextNodeType;
                        return (
                            <Text
                                key={index}
                                show={showKids}
                                showHide={f => f}
                                snac={text}
                                cssMode={props.cssMode}
                            />
                        );
                    case 'D':
                        const cdata = kid as CDATANodeType;
                        return (
                            <CDATA
                                key={index}
                                snac={cdata}
                                cssMode={props.cssMode}
                                show={showKids}
                                showHide={f => f}
                            />
                        );
                    case 'M':
                        const comment = kid as CommentNodeType;
                        return (
                            <Comment
                                key={index}
                                snac={comment}
                                cssMode={props.cssMode}
                                show={showKids}
                                showHide={f => f}
                            />
                        );
                    case 'P':
                        const pi = kid as PINodeType;
                        return (
                            <PI
                                key={index}
                                snac={pi}
                                cssMode={props.cssMode}
                                show={showKids}
                                showHide={f => f}
                            />
                        );
                    default:
                        return null;
                }
            })}
            <Tag
                show={showKids}
                showHide={showHideKids}
                snac={props.snac}
                tagType={TagType.close}
                cssMode={props.cssMode}
            />
        </>
    );
}

export default Element;