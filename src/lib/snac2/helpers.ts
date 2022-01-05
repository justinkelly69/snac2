import { NodeType, ChildNodeType } from './elements';

export const setId = (nodeType: NodeType, treeId: string, path: Array<number>, index: number): string => {
    const fullPath = [...path, index].join(',');
    return `${nodeType}:${treeId}:${fullPath}`;
}

export const getType = (node:ChildNodeType):NodeType => {
    const firstChar = node._.split(/:/)[0];
    if(['N', 'T', 'D', 'M', 'P', 'I'].indexOf(firstChar) === -1){
        return 'Z' as NodeType;
    } else {
        return firstChar as NodeType;
    }
}

export const getPath = (node:ChildNodeType):Array<number> => {
    const path:Array<number> = [];
    for(let element of node._.split(/:/)[2].split(/,/)){
        path.push(parseInt(element))
    }
    return path;
}