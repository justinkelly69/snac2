export interface AttributesNodeType {
    [r1: string]: { [r2: string]: string },
}

export interface AttributeKeysType {
    [k1: string]: { [k2: string]: null } | null,
}

export const cloneAttributes = (A: AttributesNodeType, action?: {
    remove?: AttributeKeysType,
    replace?: AttributesNodeType,
}): AttributesNodeType => {
    const atts: AttributesNodeType = {};

    for (let k1 of Object.keys(A)) {
        if(action && action.remove && action.remove[k1] === null) {
            continue;
        }
        atts[k1] = {};
        for (let k2 of Object.keys(A[k1])) {
            if(action && action.remove && typeof action.remove[k1] === 'object') {
                if(action.remove[k1]?.hasOwnProperty(k2)) {
                    continue;
                }
            }
            atts[k1][k2] = A[k1][k2];
        }
    }

    if (action && action.replace) {
        for (let r1 of Object.keys(action.replace)) {
            if (!atts.hasOwnProperty(r1)) {
                atts[r1] = {};
            }
            for (let r2 of Object.keys(action.replace[r1])) {
                atts[r1][r2] = action.replace[r1][r2];
            }
        }
    }

    return atts;
}
