import { Node } from './element';
import { setId } from './prefix';
import { escapeText } from './textprocessor';

/**
* Escape '--' as '- - ' in a Comment string.
* If the first character is '-', replace it with '- '.
* If the last character is '-', replace it with ' -'/
* @param {String} str 
*/
export const escapeComment = (str: string) =>
    escapeText(str, [
        ["--", "- - "],
        [/^-/, " -"],
        [/-$/, "- "]
    ])

export interface CommentNodeArgs {
    comment: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface CommentNodeType extends Node {
    M: string,
};

export const createCommentNode = (node: CommentNodeArgs): CommentNodeType => {
    const newCommentNode: CommentNodeType = {
        _: setId('M', node.treeId, node.path),
        M: node.comment,
        o: node.open || false,
        q: node.selected || false,
    }
    return newCommentNode;
};

export interface CommentNodeCloneArgs extends CommentNodeType {
    treeId: string,
    path: Array<number>,
};

export const cloneCommentNode = (node: CommentNodeCloneArgs): CommentNodeType => {
    return createCommentNode({
        comment: node.M,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
};
