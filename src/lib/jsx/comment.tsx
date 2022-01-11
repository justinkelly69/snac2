import React from 'react';
import { CommentNodeType } from '../snac2/comments';
import { escapeComment } from '../snac2/helpers';

export interface CommentArgs {
    snac: CommentNodeType,
    cssMode: string,
    cssPrefix: string,
};

export const Comment = (props: CommentArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-comment-display-${props.cssMode}`}>
            <span className={`${props.cssPrefix}-comment-bracket-${props.cssMode}`}>
                &lt;!--
            </span>
            <span className={`${props.cssPrefix}-comment-body-${props.cssMode}`}>
                {escapeComment(props.snac.M)}
            </span>
            <span className={`${props.cssPrefix}-comment-bracket-${props.cssMode}`}>
                --&gt;
            </span>
        </span>
    )
}