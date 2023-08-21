import { xml2js } from 'xml-js';
import { processXML } from '../snac/xml2snac'
import { processSNAC } from '../snac/snac2xml';
import { createElementNode, ElementNodeType, ChildNodeType } from './element';
import { createTextNode, TextNodeType } from './text';
import { createCDATANode, CDATANodeType } from './cdata';
import { createCommentNode, CommentNodeType } from './comment';
import { createPINode, PINodeType } from './pi';

type XMLSnacChild = X2SElement | X2SText | X2SCDATA | X2SComment | X2SPI;

interface X2SElement {
    type: string,
    name: string,
    attributes?: { [name: string]: string },
    elements?: Array<XMLSnacChild>,
    treeId: string,
    path: Array<number>,
}

interface X2SText {
    type: string,
    text: string,
    treeId: string,
    path: Array<number>,
}

interface X2SCDATA {
    type: string,
    cdata: string,
    treeId: string,
    path: Array<number>,
}

interface X2SComment {
    type: string,
    comment: string,
    treeId: string,
    path: Array<number>,
}

interface X2SPI {
    type: string,
    name: string,
    instruction: string,
    treeId: string,
    path: Array<number>,
}

interface X2SChildren {
    kids: Array<XMLSnacChild>,
    treeId: string,
    path: Array<number>,
};

export const xml2snac = (xml: string):any => {
    //const out = xml2js(xml, { compact: false }).elements[0]
    const snac = processXML(xml)
    console.log('out', JSON.stringify(snac,null,4))

    const xml2 = processSNAC(snac, {
        prefixStart: "",
        prefixCharacter: "\t",
        attributePrefix: "  ",
        minify: false,
        usePrefix: true,
        selfCloseTags: true,
        trimText: true,
    })

    console.log(xml2)
    // return createElement({
    //     type: 'element',
    //     name: out.name,
    //     attributes: out.attributes,
    //     elements: out.elements,
    //     treeId: 'feckoff',
    //     path: [],
    // })
}

const createElement = (args: X2SElement): ElementNodeType => {
    let ns = ''
    let name = args.name
    if (args.name.indexOf(':') > -1) {
        [ns, name] = args.name.split(/:/)
    }
    const element = createElementNode({
        ns: ns,
        name: name,
        attributes: args.attributes,
        children: createChildren({
            kids: args.elements || [],
            treeId: args.treeId,
            path: [...args.path],
        }),
        aOpen: false,
        open: true,
        selected: false,
        treeId: args.treeId,
        path: [...args.path],
    })
    return element
}

const createChildren = (atts: X2SChildren): Array<ChildNodeType> => {
    const out: Array<ChildNodeType> = []
    let index = 0
    for (const kid of atts.kids) {
        switch (kid.type) {

            case 'element':
                const kElement = kid as X2SElement
                out.push(createElement({
                    type: 'element',
                    name: kElement.name,
                    attributes: kElement.attributes,
                    elements: kElement.elements,
                    treeId: atts.treeId,
                    path: [...atts.path, index],
                }))
                break

            case 'text':
                const kText = kid as X2SText
                out.push(createText({
                    type: 'text',
                    text: kText.text,
                    treeId: atts.treeId,
                    path: [...atts.path, index],
                }))
                break

            case 'cdata':
                const kCDATA = kid as X2SCDATA
                out.push(createCDATA({
                    type: 'cdata',
                    cdata: kCDATA.cdata,
                    treeId: atts.treeId,
                    path: [...atts.path, index],
                }))
                break

            case 'comment':
                const kComment = kid as X2SComment
                out.push(createComment({
                    type: 'comment',
                    comment: kComment.comment,
                    treeId: atts.treeId,
                    path: [...atts.path, index],
                }))
                break

            case 'instruction':
                const kPI = kid as X2SPI
                out.push(createPI({
                    type: 'instruction',
                    name: kPI.name,
                    instruction: kPI.instruction,
                    treeId: atts.treeId,
                    path: [...atts.path, index],
                }))
                break

            default:
                console.log('something wroong')
        }
        index = index + 1
    }
    return out
}

const createText = (args: X2SText): TextNodeType => {
    return createTextNode({
        text: args.text,
        open: false,
        selected: false,
        treeId: args.treeId,
        path: [...args.path],
    })
}

const createCDATA = (args: X2SCDATA): CDATANodeType => {
    return createCDATANode({
        cdata: args.cdata,
        open: false,
        selected: false,
        treeId: args.treeId,
        path: [...args.path],
    })
}

const createComment = (args: X2SComment): CommentNodeType => {
    return createCommentNode({
        comment: args.comment,
        open: false,
        selected: false,
        treeId: args.treeId,
        path: [...args.path],
    })
}

const createPI = (args: X2SPI): PINodeType => {
    return createPINode({
        lang: args.name,
        body: args.instruction,
        open: false,
        selected: false,
        treeId: args.treeId,
        path: [...args.path],
    })
}
