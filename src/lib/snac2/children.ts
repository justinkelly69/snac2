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

    const xargs = {
        treeId: args.treeId,
        path: args.path,
    }

    for (let kid of args.kids) {
        currType = getType(kid);

        if (prevType !== 'T' && currType !== 'T') {
            currType = 'T';
            newKids.push(createBlankText({
                ...xargs,
                index: index,
            }));
            index = index + 1;
        }

        const newKid = cloneChild({
            ...xargs,
            child: kid,
            index: index,
        });
        if (newKid !== null) {
            newKids.push(newKid);
            prevType = currType;
            index = index + 1;
        }
    }

    if (prevType !== 'T') {
        newKids.push(createBlankText({
            ...xargs,
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
    const xargs = {
        treeId: args.treeId,
        path: args.path,
        index: args.index,
    }
    switch (getType(args.child)) {
        case 'N':
            return cloneElementNode({
                ...args.child as ElementNodeType,
                ...xargs,
            });
        case 'T':
            return cloneTextNode({
                ...args.child as TextNodeType,
                ...xargs,
            });
        case 'D':
            return cloneCDATANode({
                ...args.child as CDATANodeType,
                ...xargs,
            });
        case 'M':
            return cloneCommentNode({
                ...args.child as CommentNodeType,
                ...xargs,
            });
        case 'P':
            return clonePINode({
                ...args.child as PINodeType,
                ...xargs,
            });
        case 'I':
            return cloneIPNode({
                ...args.child as IPNodeType,
                ...xargs,
            });
        default:
            return null;
    }
}
