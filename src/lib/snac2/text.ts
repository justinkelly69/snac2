import { Node } from './element';
import { setId } from './prefix';
import { escapeText } from './textprocessor';

/**
 * Escape < > & ' " characters in a string
 * @param {String} str 
 */
 export const escapeXML = (str: string) =>
 escapeText(str, [
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
 escapeText(str, [
     ["&lt;", "<"],
     ["&gt;", ">"],
     ["&amp;", "&"],
     ["&apos;", "'"],
     ["&quot;", '"']
 ])

export interface TextNodeArgs {
    text: string,
    open?: boolean,
    selected?: boolean,
    treeId: string,
    path: Array<number>,
};

export interface TextNodeType extends Node {
    T: string,
};

export const createTextNode = (node: TextNodeArgs): TextNodeType => {
    const newTextNode: TextNodeType = {
        _: setId('T', node.treeId, node.path),
        T: node.text,
        o: node.open || false,
        q: node.selected || false,
    }
    return newTextNode;
}
export interface TextNodeBlankArgs {
    treeId: string,
    path: Array<number>,
};
export const createBlankText = (args: TextNodeBlankArgs) => {
    return createTextNode({
        text: '',
        treeId: args.treeId,
        path: args.path,
    })
}

export interface TextNodeCloneArgs extends TextNodeType {
    treeId: string,
    path: Array<number>,
};

export const cloneTextNode = (node: TextNodeCloneArgs): TextNodeType => {
    return createTextNode({
        text: node.T,
        open: node.o,
        selected: node.q,
        treeId: node.treeId,
        path: node.path,
    });
}
