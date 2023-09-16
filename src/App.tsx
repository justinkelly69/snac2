import React from 'react';

import xml1 from './lib/data/xml/waffle'
import xml2snac from './lib/snac/xml2snac'
import snac2xml, { ITag } from './lib/snac/snac2xml';


function App() {

    const xmlOpts : XMLOpts = {
        prefiNewLine: true,
        prefixShow: true,
        prefixChar: "    ",
        attributePrefix: "  ",
        selfCloseTags: true,
        trimText: true,
        allowComments: true,
        allowPIs: true,
    }

    const snac2xmlOpts : SNAC2XMLOpts = {
        selfCloseTags: true,
        trimText: true,
        allowComments: true,
        allowPIs: true,
    }

    const funcs = { OpenTag, CloseTag, EmptyTag, Text, CDATA, Comment, PI, Attributes, Attribute, Prefix }
    const snac = xml2snac(xml1)
    const xml2 = snac2xml(snac, xmlOpts)
    const xml3 = xmlOut(snac, funcs, snac2xmlOpts)

    return (
        <>
            <pre>{xml1}</pre>
            <hr />
            <pre>{JSON.stringify(snac, null, 4)}</pre>
            <hr />
            <pre>{xml2}</pre>
            <hr />
            <pre>{xml3}</pre>
        </>
    )
}

export default App;
