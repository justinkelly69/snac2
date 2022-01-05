import { Node } from './elements';
import { setId } from './helpers';

export interface CommentNodeArgs {
    comment: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
    index: number,
};

export interface CommentNodeType extends Node {
    M: string,
};

export const createCommentNode = (node: CommentNodeArgs): CommentNodeType => {
    const newCommentNode: CommentNodeType = {
        _: setId('M', node.treeId, node.path, node.index),
        M: node.comment,
        o: node.open || false,
        q: node.selected || false,
    }
    return newCommentNode;
};

export interface CommentNodeCloneArgs extends CommentNodeType {
    treeId: string,
    path: Array<number>,
    index: number,
};

export const cloneCommentNode = (node: CommentNodeCloneArgs): CommentNodeType => {
    return createCommentNode({
        comment: node.M,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
        index: node.index,
    });
};