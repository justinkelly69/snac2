import { getType } from './helpers';
import { ChildNodeType, cloneElementNode, NodeType, ElementNodeType } from './elements';
import { cloneTextNode, createBlankText, TextNodeType } from './texts';
import { cloneCDATANode, CDATANodeType } from './cdata';
import { cloneCommentNode, CommentNodeType } from './comments';
import { clonePINode, PINodeType } from './pis';
import { cloneIPNode, IPNodeType } from './ips';

export interface ElementChildrenArgs {
    kids: Array<ChildNodeType>,
    treeId: string,
    path: Array<number>,
}

export const cloneChildren = (args: ElementChildrenArgs): Array<ChildNodeType> => {
    const newKids: Array<ChildNodeType> = [];
    let currType: NodeType = 'Z';
    let prevType: NodeType = 'Z';
    let index = 0;
    for (let kid of args.kids) {
        currType = getType(kid);
        if (prevType !== 'T' && currType !== 'T') {
            currType = 'T';
            newKids.push(createBlankText({
                treeId: args.treeId,
                path: [...args.path, index],
            }));
            index = index + 1;
        }
        const newKid = cloneChild({
            treeId: args.treeId,
            path: [...args.path],
            index: index,
            child: kid,
        });
        if (newKid !== null) {
            newKids.push(newKid);
            prevType = currType;
            index = index + 1;
        }
    }
    if (prevType !== 'T') {
        newKids.push(createBlankText({
            treeId: args.treeId,
            path: [...args.path, index],
        }));
    }
    return newKids;
}

export interface ElementChildArgs {
    child: ChildNodeType,
    treeId: string,
    path: Array<number>,
    index: number,
}

export const cloneChild = (args: ElementChildArgs): ChildNodeType | null => {
    switch (getType(args.child)) {
        case 'N':
            return cloneElementNode({
                ...args.child as ElementNodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        case 'T':
            return cloneTextNode({
                ...args.child as TextNodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        case 'D':
            return cloneCDATANode({
                ...args.child as CDATANodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        case 'M':
            return cloneCommentNode({
                ...args.child as CommentNodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        case 'P':
            return clonePINode({
                ...args.child as PINodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        case 'I':
            return cloneIPNode({
                ...args.child as IPNodeType,
                treeId: args.treeId,
                path: [...args.path, args.index],
            });
        default:
            return null;
    }
}
