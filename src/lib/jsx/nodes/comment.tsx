import React from 'react';
import { CommentNodeType } from '../../snac2/comments';
import { escapeComment } from '../../snac2/helpers';
import { Span } from '../styled/span';
import { getColors } from '../styled/colors';

export interface CommentArgs {
    snac: CommentNodeType,
    cssMode: string,
};

export const Comment = (props: CommentArgs): JSX.Element => {

    const c = getColors(props.cssMode);

    return (
        <Span color={c.CommentBody}>
            <Span color={c.CommentHeading}>
                &lt;!--
            </Span>
            {escapeComment(props.snac.M)}
            <Span color={c.CommentHeading}>
                --&gt;
            </Span>
        </Span>
    )
}
