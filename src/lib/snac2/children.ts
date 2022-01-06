import { getType } from './helpers';
import { ChildNodeType, cloneElementNode, NodeType, ElementNodeType } from './elements';
import { cloneTextNode, createBlankText, TextNodeType } from './texts';
import { cloneCDATANode, CDATANodeType } from './cdata';
import { cloneCommentNode, CommentNodeType } from './comments';
import { clonePINode, PINodeType } from './processing-instructions';
import { cloneIPNode, IPNodeType } from './insert-points';

export interface ElementChildrenArgs {
    kids: Array<ChildNodeType>,
    treeId: string,
    path: Array<number>,
    index: number
}

export const cloneChildren = (args: ElementChildrenArgs): Array<ChildNodeType> => {
    const newKids: Array<ChildNodeType> = [];
    let currType: NodeType = 'Z';
    let prevType: NodeType = 'Z';
    let index = 0;
    for (let kid of args.kids) {
        currType = getType(kid);
        const newKid = cloneChild({
            child: kid,
            treeId: args.treeId,
            path: args.path,
            index: index,
        });
        if (newKid !== null) {
            if (prevType !== 'T' && currType !== 'T') {
                prevType = currType;
                currType = 'T';
                newKids.push(createBlankText({
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }));
                index = index + 1;
            }
            newKids.push(newKid);
            prevType = currType;
            index = index + 1;
        }
    }
    if (prevType !== 'T') {
        newKids.push(createBlankText({
            treeId: args.treeId,
            path: args.path,
            index: index,
        }));
    }
    return newKids;
}

export interface ElementChildArgs {
    child: ChildNodeType,
    treeId: string,
    path: Array<number>,
    index: number
}

export const cloneChild = (args: ElementChildArgs): ChildNodeType | null => {
    switch (getType(args.child)) {
        case 'N':
            const newNode = args.child as ElementNodeType;
            return cloneElementNode({
                ...newNode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        case 'T':
            const newTextNode = args.child as TextNodeType;
            return cloneTextNode({
                ...newTextNode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        case 'D':
            const newCDATANode = args.child as CDATANodeType;
            return cloneCDATANode({
                ...newCDATANode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        case 'M':
            const newCommentNode = args.child as CommentNodeType;
            return cloneCommentNode({
                ...newCommentNode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        case 'P':
            const newPINode = args.child as PINodeType;
            return clonePINode({
                ...newPINode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        case 'I':
            const newIPNode = args.child as IPNodeType;
            return cloneIPNode({
                ...newIPNode,
                treeId: args.treeId,
                path: args.path,
                index: args.index,
            });
        default:
            return null;
    }
}
