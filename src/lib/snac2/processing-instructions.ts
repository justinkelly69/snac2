import { Node } from './elements';
import { setId } from './helpers';

export interface PINodeArgs {
    lang: string,
    body: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface PINodeType extends Node {
    L: string,
    B: string,
};

export const createPINode = (node: PINodeArgs): PINodeType => {
    const newPINode: PINodeType = {
        _: setId('P', node.treeId, node.path),
        L: node.lang,
        B: node.body,
        o: node.open || false,
        q: node.selected || false,
    }
    return newPINode;
};

export interface PINodeCloneArgs extends PINodeType {
    treeId: string,
    path: Array<number>,
};

export const clonePINode = (node: PINodeCloneArgs): PINodeType => {
    return createPINode({
        lang: node.L,
        body: node.B,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
};