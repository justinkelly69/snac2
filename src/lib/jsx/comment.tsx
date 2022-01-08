import React from 'react';
import { CommentNodeType } from '../snac2/comments';

export interface SNACComment {
    snac: CommentNodeType,
    cssPrefix: string,
};

export const XComment = (props:SNACComment): JSX.Element => {
    return (
        <span className={`${props.cssPrefix}-text-display`}>
            &lt;!--
            {props.snac.M}
            --&gt;
        </span>
    )
}