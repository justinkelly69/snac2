import xml2snac from "./xml2snac"
import {
    SNACItem,
    SNACElement,
    SNACText,
    SNACCDATA,
    SNACComment,
    SNACPINode,
} from "./types"

const find = (
    snac: SNACItem[],
    path: number[]
): SNACItem | null => {

    const element: SNACItem = {
        N: "",
        A: {},
        C: snac,
    }

    return _find(element, path)
}

const _find = (
    snac: SNACItem,
    path: number[]
): SNACItem | null => {

    if (path.length === 0) {
        return snac
    }
    else {
        if (snac.hasOwnProperty('C')) {
            const S = snac as SNACElement
            const [i, ...p] = path
            if (S.C.length > i) {
                return _find(S.C[i], p)
            }
        }
    }

    return null
}

export const findElement = (
    snac: SNACItem[],
    path: number[]
) => {
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

export const comparePaths = (
    p1: number[],
    p2: number[]
): number | null => {

    if (
        p1.length === 0 ||
        p2.length === 0 ||
        p1.length !== p2.length
    ) {
        return null
    }

    const len = p1.length - 1

    for (const i in p1) {
        if (p1[i] !== p2[i]) {
            return null
        }
    }

    return p1[len] - p2[len]
}

export const selectNode = (
    newPath: number[],
    selected: number[][]
): number[][] => {

    const len = selected.length

    if (len === 0) {
        return [newPath]
    }

    const startSelected = comparePaths(newPath, selected[0])

    if (startSelected === null) {
        return [newPath]
    }
    else if (startSelected === -1) {
        return [newPath, ...selected]
    }
    else if (startSelected === 0) {
        return selected.slice(1)
    }

    const endSelected = comparePaths(newPath, selected[len - 1])

    if (endSelected === 1) {
        return [...selected, newPath]
    }
    else if (endSelected === 0) {
        return selected.slice(len - 1)
    }
    else {
        return [newPath]
    }
}

export const isSelected = (
    testPath: number[],
    selected: number[][]
): boolean => {

    for (const i in selected) {
        if (comparePaths(testPath, selected[i]) === 0) {
            return true
        }
    }

    return false
}







