import React from 'react';

import xml1 from './lib/data/xml/waffle'
import xml2snac from './lib/snac/xml2snac'
import snac2xml from './lib/snac/snac2xml';
import { XMLOpts } from './lib/snac/types'


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
    const snac = xml2snac(xml1)
    const xml2 = snac2xml(snac, xmlOpts)

    return (
        <>
            <pre>{xml1}</pre>
            <hr />
            <pre>{JSON.stringify(snac, null, 4)}</pre>
            <hr />
            <pre>{xml2}</pre>
        </>
    )
}

export default App;
