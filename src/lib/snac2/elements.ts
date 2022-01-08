import { setId } from './helpers';
import { cloneAttributes, AttributesNodeType } from './attributes';
import { TextNodeType } from './texts';
import { CDATANodeType } from './cdata';
import { CommentNodeType } from './comments';
import { PINodeType } from './pis';
import { IPNodeType } from './ips';
import { cloneChildren } from './children';

export interface Node {
    _: string,
    q: boolean,
    o: boolean,
};

export type NodeType = 'N' | 'T' | 'D' | 'M' | 'P' | 'I' | 'Z';

export type ChildNodeType = ElementNodeType | TextNodeType | CDATANodeType | CommentNodeType | PINodeType | IPNodeType;

export interface ElementNodeArgs {
    ns?: string,
    name: string,
    attributes?: AttributesNodeType,
    children?: Array<ChildNodeType>,
    aOpen?: boolean,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface ElementNodeType extends Node {
    S: string,
    N: string,
    A: AttributesNodeType,
    C: Array<ChildNodeType>,
    a: boolean,
};

export const createElementNode = (args: ElementNodeArgs): ElementNodeType => ({
    _: setId('N', args.treeId, args.path),
    S: args.ns || '@',
    N: args.name,
    A: cloneAttributes(args.attributes || {}),
    C: cloneChildren({
        kids: args.children || [],
        treeId: args.treeId,
        path: args.path,
    }),
    a: args.aOpen || false,
    o: args.open || true,
    q: args.selected || false,
})

export interface ElementNodeCloneArgs extends ElementNodeType {
    treeId: string,
    path: Array<number>,
}

export const cloneElementNode = (args: ElementNodeCloneArgs): ElementNodeType => {
    return createElementNode({
        ns: args.S,
        name: args.N,
        attributes: args.A,
        children: args.C,
        aOpen: args.a,
        open: args.o,
        selected: args.q,
        treeId: args.treeId,
        path: args.path,
    })
}

