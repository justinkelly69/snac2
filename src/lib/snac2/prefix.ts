import { NodeType, ChildNodeType } from './element'
import { constants } from './constants'

export const setId = (nodeType: NodeType, treeId: string, path: Array<number>): string => {
    let fullPath = [...path].join(constants.JOIN2)
    
    return `${nodeType}${constants.JOIN1}${treeId}${constants.JOIN1}${fullPath}`
}

export const getPath = (node: ChildNodeType): Array<number> => {
    const path: Array<number> = []

    for (let element of node._.split(constants.JOIN1)[2].split(constants.JOIN2)) {
        path.push(parseInt(element))
    }

    return path
}

export const getPrefix = (prefixStr: string, prefixStart: string, prefixStep: string, prefixEnd: string): string => {
    const p1 = prefixStr.split(constants.JOIN1)[2]
    let out = prefixStart

    if (p1.length > 0) {
        const p2 = p1.split(constants.JOIN2)
        let i = 0
        for (i = 0; i < p2.length; i = i + 1) {
            out = out + prefixStep
        }
    }

    return out + prefixEnd
}
