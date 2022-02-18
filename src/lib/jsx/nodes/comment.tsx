import React from 'react';
import { CommentNodeType } from '../../snac2/comments';
import { escapeComment } from '../../snac2/helpers';
import { Block } from '../styled/block';
import { Span } from '../styled/span';
import { Prefix } from './prefix'; import { getColors } from '../styled/colors';

export interface CommentArgs {
    snac: CommentNodeType,
    cssMode: string,
    show: boolean,
    showHide: Function,
};

export const Comment = (props: CommentArgs): JSX.Element => {

    const colors = getColors(props.cssMode);

    return (
        <Block visible={props.show}
            Prop1={
                <Prefix _={props.snac._}
                    color={colors.Prefix}
                    show={props.show}
                    showHide={props.showHide}
                />
            }
            Prop2={
                <Span color={colors.CommentBody}>
                    <Span color={colors.CommentHeading}>
                        &lt;!--
                    </Span>
                    {escapeComment(props.snac.M)}
                    <Span color={colors.CommentHeading}>
                        --&gt;
                    </Span>
                </Span>
            }
        />
    );
}
