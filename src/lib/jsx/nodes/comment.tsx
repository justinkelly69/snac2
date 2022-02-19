import React, {useState} from 'react';
import { CommentNodeType } from '../../snac2/comments';
import { escapeComment } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix'; import { getColors } from '../styled/colors';
import constants from '../../snac2/constants';

export interface CommentArgs {
    snac: CommentNodeType,
    cssMode: string,
    show: boolean,
};

export const Comment = (props: CommentArgs): JSX.Element => {

    const [showComment, showHideComment] = useState(props.snac.o);

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
                    color={colors.Prefix}
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
                        escapeComment(props.snac.M.substring(0, constants.COMMENT_PREVIEW_LENGTH))
                    }
                    <Span color={colors.CommentHeading}>
                        --&gt;
                    </Span>
                </Span>
            }
        />
    );
}
