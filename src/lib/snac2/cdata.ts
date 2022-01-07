import { Node } from './elements';
import { setId } from './helpers';

export interface CDATANodeArgs {
    cdata: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface CDATANodeType extends Node {
    D: string,
};

export const createCDATANode = (node: CDATANodeArgs): CDATANodeType => {
    const newCDATANode: CDATANodeType = {
        _: setId('D', node.treeId, node.path),
        D: node.cdata,
        o: node.open || false,
        q: node.selected || false,
    }
    return newCDATANode;
}

export interface CDATANodeCloneArgs extends CDATANodeType {
    treeId: string,
    path: Array<number>,
};

export const cloneCDATANode = (node: CDATANodeCloneArgs): CDATANodeType => {
    return createCDATANode({
        cdata: node.D,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
}