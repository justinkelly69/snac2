import React from 'react';
import "./App.css";

import xmlInput from './lib/data/xml/waffle'
import xml2snac from './lib/snac/xml2snac'
import snac2xml from './lib/snac/snac2xml';
import { SNAC2XMLOpts, XMLOpts } from './lib/snac/types'
import xmlOut from './lib/tsx/snac2xml';
import { Attribute, Attributes, CDATA, CloseTag, EmptyTag, Text, Comment, OpenTag, PI, Prefix } from './outFuncs';


function App() {

    const xmlOpts: XMLOpts = {
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
    const snac = xml2snac(xmlInput)

    const xml2 = snac2xml(snac, xmlOpts)
    const xml3 = xmlOut(snac, funcs, snac2xmlOpts)

    return (
        <>
            <h2>XML INPUT</h2>
            <pre>{xmlInput}</pre>
            <hr />
            <h2>SNAC</h2>
            <pre>{JSON.stringify(snac, null, 4)}</pre>
            <hr />
            <h2>SNAC 2 XML</h2>
            <pre>{xml2}</pre>
            <hr />
            <h2>XMLOUT</h2>
            <pre>{xml3}</pre>
        </>
    )
}

export default App;
