import { getType } from './helpers';
import { ChildNodeType, cloneElementNode, ElementNodeType} from './elements';
import { cloneTextNode, TextNodeType } from './texts';
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
    for (let index = 0; index < args.kids.length; index = index + 1) {
        switch (getType(args.kids[index])) {
            case 'N':
                const newNode = args.kids[index] as ElementNodeType;
                newKids.push(cloneElementNode({
                    ...newNode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }));
                break;
            case 'T':
                const newTextNode = args.kids[index] as TextNodeType;
                newKids.push(cloneTextNode({
                    ...newTextNode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }));
                break;
            case 'D':
                const newCDATANode = args.kids[index] as CDATANodeType;
                newKids.push(cloneCDATANode({
                    ...newCDATANode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }))
                break;
            case 'M':
                const newCommentNode = args.kids[index] as CommentNodeType;
                newKids.push(cloneCommentNode({
                    ...newCommentNode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }))
                break;
            case 'P':
                const newPINode = args.kids[index] as PINodeType;
                newKids.push(clonePINode({
                    ...newPINode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }))
                break;
            case 'I':
                const newIPNode = args.kids[index] as IPNodeType;
                newKids.push(cloneIPNode({
                    ...newIPNode,
                    treeId: args.treeId,
                    path: args.path,
                    index: index,
                }))
                break;
        }
    }
    return newKids;
}
