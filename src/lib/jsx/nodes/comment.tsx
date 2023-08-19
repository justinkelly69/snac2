import React, { useState } from 'react';
import { CommentNodeType } from '../../snac2/comment';
import { escapeComment } from '../../snac2/comment';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix'; import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';
import { normalize } from '../../snac2/textprocessor';
import { getPrefix } from '../../snac2/prefix';

export interface CommentArgs {
    snac: CommentNodeType,
    cssMode: string,
};

export const Comment = (props: CommentArgs): JSX.Element => {

    const [showComment, showHideComment] = useState(props.snac.o);
    const [selected, setSelected] = useState(props.snac.q);
    const colors = getColors(props.cssMode);
    const prefix = getPrefix(props.snac._);

    return (
        <Block visible={true} selected={selected}
            Prop1={
                <Prefix
                    prefix={prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => {
                        setSelected(!selected)
                        console.log(`selected is now ${selected}`)
                    }}
                    showKids={showComment}
                    showHideKids={e => showHideComment(!showComment)}
                />
            }
            Prop2={
                <Span color={colors.CommentBody}>
                    <Span color={colors.CommentHeading}>
                        &lt;!--
                    </Span>
                    {showComment ?
                        escapeComment(props.snac.M) :
                        escapeComment(normalize(props.snac.M, constants.COMMENT_PREVIEW_LENGTH))
                    }
                    <Span color={colors.CommentHeading}>
                        --&gt;
                    </Span>
                </Span>
            }
        />
    );
}
