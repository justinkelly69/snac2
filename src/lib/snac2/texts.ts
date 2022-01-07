import { Node } from './elements';
import { setId } from './helpers';

export interface TextNodeArgs {
    text: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface TextNodeType extends Node {
    T: string,
};

export const createTextNode = (node: TextNodeArgs): TextNodeType => {
    const newTextNode: TextNodeType = {
        _: setId('T', node.treeId, node.path),
        T: node.text,
        o: node.open || false,
        q: node.selected || false,
    }
    return newTextNode;
}
export interface TextNodeBlankArgs {
    treeId: string,
    path: Array<number>,
};
export const createBlankText = (args: TextNodeBlankArgs) => {
    return createTextNode({
        text: '',
        treeId: args.treeId,
        path: args.path,
    })
}

export interface TextNodeCloneArgs extends TextNodeType {
    treeId: string,
    path: Array<number>,
};

export const cloneTextNode = (node: TextNodeCloneArgs): TextNodeType => {
    return createTextNode({
        text: node.T,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
}
