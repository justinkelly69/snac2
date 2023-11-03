import xml2snac from "./xml2snac"
import { SNACItem, SNACElement, SNACText, SNACCDATA, SNACComment, SNACPINode } from "./types"

const find = (snac: SNACItem[], path: number[]): SNACItem | null => {
    const element: SNACItem = {N:"", A:{}, C: snac, a:false, o:false, q:false}
    return _find(element , path)
}

const _find = (snac: SNACItem, path: number[]): SNACItem | null => {
    //console.log(snac)

    if (path.length === 0) {
        return snac
    }
    else {
        if (snac.hasOwnProperty('C')) {
            const S = snac as SNACElement
            const [i, ...p] = path;
            //console.log('S.C',S.C, 'i', i, 'length', S.C.length, 'p', p)
            if (S.C.length > i) {
                return _find(S.C[i], p)
            }
        }
    }
    return null
}

export const findElement = (snac: SNACItem[], path: number[]) => {
    const e = find(snac, path)

    if (e !== null) {
        if (e.hasOwnProperty('N')) {
            const element = e as SNACElement
            console.log(element.N)
        }
        else if (e.hasOwnProperty('T')) {
            const element = e as SNACText
            console.log(element.T)
        }
        else if (e.hasOwnProperty('D')) {
            const element = e as SNACCDATA
            console.log(element.D)
        }
        else if (e.hasOwnProperty('M')) {
            const element = e as SNACComment
            console.log(element.M)
        }
        else if (e.hasOwnProperty('L')) {
            const element = e as SNACPINode
            console.log(element.B)
        }
        else {
            console.log("Invalid Element")
        }
    }
    else {
        console.log("No element found")
    }
}