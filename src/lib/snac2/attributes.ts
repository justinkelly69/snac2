
export interface AttributesNodeType {
    [k: string]: string,
}

export interface AttributeKeysType {
    keys: [string]
}

export const cloneAttributes = (A: AttributesNodeType, action?: {
    remove?: AttributeKeysType,
    replace?: AttributesNodeType,
}): AttributesNodeType => {

    const atts: AttributesNodeType = {};
    for (let k of Object.keys(A)) {
        if (action && action.remove && action.remove[k] === null) {
            continue
        }
        else {
            atts[k] = A[k]
        }
    }

    if (action && action.replace) {
        for (let k of Object.keys(action.replace)) {
            atts[k] = action.replace[k]
        }
    }

    return atts
}
