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

    // Item is found
    if (path.length === 0) {
        return snac
    }
    // Check if the item is a SNACElement with children
    // and the number of children is greater than the first path element
    // Then descend into the child
    // Otherwise return null
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

/**
* Compares two paths
* @param p1 - The first path as an array of numbers
* @param p2 - The second path as an array of numbers
* returns null if paths are different lengths or empty,
* returns 0 if all elements are the same
* returns 1 if the last element of p1 = last element of p2 + 1
* and all other elements are the same
* returns -1 if the last element of p1 = last element of p2 - 1
* and all other elements are the same
*/
export const comparePaths = (
    p1: number[],
    p2: number[]
): number | null => {

    // If either path is empty or they have different lengths, return null
    if (
        p1.length === 0 ||
        p2.length === 0 ||
        p1.length !== p2.length
    ) {
        return null
    }

    // Get the length of the paths minus one
    const len = p1.length - 1

    // Compare each element in the paths except the last one
    // If they are not the same, return null
    for (const i in p1) {
        if (p1[i] !== p2[i]) {
            return null
        }
    }

    // Compare the last element of both paths
    if (p1[len] - p2[len] === 0) {
        return 0
    }
    else if (p1[len] - p2[len] === 1) {
        return 1
    }
    else if (p1[len] - p2[len] === -1) {
        return -1
    }
    return null
}

/**
 * Tests newPath against selectedPaths
 * @newPath - The new path to be selected
 * @selected - The currently selected paths
 */
export const selectNode = (
    newPath: number[],
    selected: number[][]
): number[][] => {

    const len = selected.length

    // If there are no selected paths, return the new path as the only selection
    if (len === 0) {
        return [newPath]
    }

    // Compare newPath with the first selected path
    const startSelected = comparePaths(newPath, selected[0])

    // If newPath is not adjacent to the first selected path,
    // return it as the only selection
    if (startSelected === null) {
        return [newPath]
    }
    // If newPath is adjacent to the first selected path,
    // append it to the beginning of the selection
    else if (startSelected === -1) {
        return [newPath, ...selected]
    }
    // If newPath is the same as the first selected path,
    // remove it from the the selected paths
    else if (startSelected === 0) {
        return selected.slice(1)
    }

    // Compare newPath with the last selected path
    const endSelected = comparePaths(newPath, selected[len - 1])

    // If newPath is adjacent to the last selected path
    // append it to the end of the selected paths
    if (endSelected === 1) {
        return [...selected, newPath]
    }
    // If newPath is the same as the last selected path,
    // remove it from the selected paths
    else if (endSelected === 0) {
        return selected.slice(len - 1)
    }
    // If newPath is not adjacent to the last selected path,
    // return it as the only selection
    else {
        return [newPath]
    }
}

/**
 * Test if a path is selected
 * @param testPath - The path to test
 * @param selected - The currently selected paths
 */
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







