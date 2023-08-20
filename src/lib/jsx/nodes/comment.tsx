import { useState } from 'react'
import { SNACComment, SNACPrefix, SNACTextProcessor } from '../../snac2'
import { StyledBlock, StyledColors, StyledConstants, StyledSpan } from '../styled'
import { Prefix } from './prefix'


export interface CommentArgs {
    snac: SNACComment.CommentNodeType,
    cssMode: string,
};

export const Comment = (props: CommentArgs): JSX.Element => {

    const [showComment, showHideComment] = useState(props.snac.o)
    const [selected, setSelected] = useState(props.snac.q)
    const colors = StyledColors.getColors(props.cssMode)
    const prefix = SNACPrefix.getPrefix(props.snac._, StyledConstants.constants.PREFIX_START, StyledConstants.constants.PREFIX_ON, StyledConstants.constants.PREFIX_END)

    return (
        <StyledBlock.Block visible={true} selected={selected}
            Prop1={
                <Prefix
                    prefix={prefix}
                    color={colors.Prefix}
                    selectedNode={selected}
                    selectNode={e => setSelected(!selected)}
                    showKids={showComment}
                    showHideKids={e => showHideComment(!showComment)}
                />
            }
            Prop2={
                <StyledSpan.Span color={colors.CommentBody}>
                    <StyledSpan.Span color={colors.CommentHeading}>
                        &lt;!--
                    </StyledSpan.Span>
                    {showComment ?
                        SNACComment.escapeComment(props.snac.M) :
                        SNACComment.escapeComment(SNACTextProcessor.normalize(props.snac.M, StyledConstants.constants.COMMENT_PREVIEW_LENGTH))
                    }
                    <StyledSpan.Span color={colors.CommentHeading}>
                        --&gt;
                    </StyledSpan.Span>
                </StyledSpan.Span>
            }
        />
    );
}
