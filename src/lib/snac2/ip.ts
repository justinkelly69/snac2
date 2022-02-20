import { Node } from './element';
import { setId } from './prefix';

export interface IPNodeArgs {
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface IPNodeType extends Node { };

export const createIPNode = (node: IPNodeArgs): IPNodeType => {
    const newIPNode: IPNodeType = {
        _: setId('I', node.treeId, node.path),
        o: node.open || false,
        q: node.selected || false,
    }
    return newIPNode;
};

export interface IPNodeCloneArgs extends IPNodeType {
    treeId: string,
    path: Array<number>,
};

export const cloneIPNode = (node: IPNodeCloneArgs): IPNodeType => {
    return createIPNode({
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
};
