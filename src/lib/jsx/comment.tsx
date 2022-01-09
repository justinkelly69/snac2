import React from 'react';
import { CommentNodeType } from '../snac2/comments';

export interface CommentArgs {
    snac: CommentNodeType,
    cssPrefix: string,
};

export const Comment = (props: CommentArgs): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-comment-display`}>
            <span className={`${props.cssPrefix}-comment-bracket`}>
                &lt;!--
            </span>
            <span className={`${props.cssPrefix}-comment-body`}>
                {props.snac.M}
            </span>
            <span className={`${props.cssPrefix}-comment-bracket`}>
                --&gt;
            </span>
        </span>
    )
}