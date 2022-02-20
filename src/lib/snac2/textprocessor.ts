/**
* Replace each <string> with <replacement> in str and return the result
* @param {String} str 
* @param {Arrray of [string, replacement] pairs} subs 
*/
export const escapeText = (str: string, subs: Array<[RegExp | string, string]>) => {
    subs.forEach(s => {
        str = str.split(s[0]).join(s[1])
    })
    return str
}

/**
* Normalize a string. Convert all blocks of one or more space, tab 
* and newline charcters with single spaces.
* @param {String} txt 
*/
export const normalize = (txt: string, length: number = -1) => {
    if(length > -1) {
        return txt.substring(0, length).trim().split(/\s+/).join(' ')
    }
    else {
        return txt.trim().split(/\s+/).join(' ')
    }
}