import xml2snac from './lib/snac/xml2snac'
import snac2xml from './lib/snac/snac2xml';
import xml1 from './lib/data/xml/waffle'

import { PrefixOpts } from './lib/snac/types';

function App() {

    const prefixOpts = {
        showPrefix: false,
        newLine: "\n",
        usePrefix: true,
        startChar: ">",
        charOn: "  ",
        charOff: "  ",
        attributePrefix: "@",
    }

    const xmlOpts = {
        selfCloseTags: false,
        trimText: true,
        allowComments: true,
        allowPIs: true,
    }

    const getPrefix = (path: number[], isAttribute: boolean, opts: PrefixOpts) => {
        let out: string = ""
        const depth = path.length

        if (!opts.showPrefix) {
            out += `${opts.newLine}`
            if (opts.usePrefix) {
                out += `${opts.startChar}`
                for (let _ of Array.from({ length: depth }, (value, index) => index)) {
                    out += `${opts.charOn}`
                }
            }
            if (isAttribute) {
                out += `${opts.attributePrefix}`
            }
        }
        return out;
    }

    const funcs = {
        openTag: (path: number[], elementName: string, attrs: string) => {
            return `${getPrefix(path, false, prefixOpts)}<${elementName}${attrs}>`
        },

        children: (children: string) => {
            return `${children}`
        },

        closeTag: (path: number[], elementName: string) => {
            return `${getPrefix(path, false, prefixOpts)}</${elementName}>`
        },

        emptyTag: (path: number[], elementName: string, attrs: string) => {
            return `${getPrefix(path, false, prefixOpts)}<${elementName}${attrs} />`
        },

        text: (path: number[], text: string) => {
            return `${getPrefix(path, false, prefixOpts)}${text}`
        },

        cdata: (path: number[], cdata: string) => {
            return `${getPrefix(path, false, prefixOpts)}<![CDATA[${cdata}]]>`
        },

        comment: (path: number[], comment: string) => {
            return `${getPrefix(path, false, prefixOpts)}<!--${comment}-->`
        },

        pi: (path: number[], lang: string, body: string) => {
            return `${getPrefix(path, false, prefixOpts)}<?${lang} ${body}?>`
        },

        attribute: (path: number[], name: string, value: string) => {
            return `${getPrefix(path, true, prefixOpts)}${name}="${value}"`
        },

        getPrefix: getPrefix
    }

    const snac = xml2snac(xml1);
    const xml2 = snac2xml(snac, funcs, xmlOpts)

    return (
        <>
            <h1>Hello World</h1>
            <pre>{JSON.stringify(snac, null, 4)}</pre>
            <hr />
            <pre>{xml2}</pre>
        </>

    )
}

export default App;
