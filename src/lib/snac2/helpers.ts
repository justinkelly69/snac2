import { NodeType, ChildNodeType } from './elements';

export const setId = (nodeType: NodeType, treeId: string, path: Array<number>): string => {
    let fullPath = [...path].join(',');
    return `${nodeType}:${treeId}:${fullPath}`;
}

export const getType = (node: ChildNodeType): NodeType => {
    const firstChar = node._.split(/:/)[0];
    if (['N', 'T', 'D', 'M', 'P', 'I'].indexOf(firstChar) === -1) {
        return 'Z' as NodeType;
    } else {
        return firstChar as NodeType;
    }
}

export const getPath = (node: ChildNodeType): Array<number> => {
    const path: Array<number> = [];
    for (let element of node._.split(/:/)[2].split(/,/)) {
        path.push(parseInt(element))
    }
    return path;
}

/**
 * Escape < > & ' " characters in a string
 * @param {String} str 
 */
export const escapeXML = (str: string) =>
    _escape(str, [
        ["&", "&amp;"],
        ["<", "&lt;"],
        [">", "&gt;"],
        ["'", "&apos;"],
        ['"', "&quot;"]
    ])

/**
* Unescape &lt; &gt; &amp; &apos, &quot escape codes in a string.
* @param {String} str 
*/
export const unEscapeXML = (str: string) =>
    _escape(str, [
        ["&lt;", "<"],
        ["&gt;", ">"],
        ["&amp;", "&"],
        ["&apos;", "'"],
        ["&quot;", '"']
    ])

/**
* Escape ]]> as ]]&lt; in a CDATA string.
* @param {String} str 
*/
export const escapeCDATA = (str: string) => _escape(str, [
    ["]]>", "]]&gt;"]
])

/**
* Escape '--' as '- - ' in a Comment string.
* If the first character is '-', replace it with '- '.
* If the last character is '-', replace it with ' -'/
* @param {String} str 
*/
export const escapeComment = (str: string) => _escape(str, [
    ["--", "- - "],
    [/^-/, " -"],
    [/-$/, "- "]
])

/**
* Escape ?> as ?&lt; in a Processing Instruction string.
* @param {String} str 
*/
export const escapePI = (str: string) => _escape(str, [["?>", "?&gt;"]])

/**
* Replace each <string> with <replacement> in str and return the result
* @param {String} str 
* @param {Arrray of [string, replacement] pairs} subs 
*/
const _escape = (str: string, subs: Array<[RegExp | string, string]>) => {
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
export const normalize = (txt:string) => txt.trim().split(/\s+/).join(' ')