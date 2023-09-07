import xml2snac from './lib/snac/xml2snac'
import snac2xml from './lib/tsx/snac2xml';
import xml1 from './lib/data/xml/waffle'

import { OpenTag, CloseTag, EmptyTag, Text, CDATA, Comment, Pi, Attributes, Attribute, Prefix, xmlOpts} from '../src/lib/tsx/outFuncs'
import React from 'react';

function App() {



    const funcs = { OpenTag, CloseTag, EmptyTag, Text, CDATA, Comment, Pi, Attributes, Attribute, Prefix }

    const snac = xml2snac(xml1);
    const xml2 = snac2xml(snac, funcs, xmlOpts)

    return (
        <>
            <h1>Hello World</h1>
            {/* <pre>{JSON.stringify(snac, null, 4)}</pre> */}
            <hr />
            <pre>{xml2}</pre>
        </>

    )
}

export default App;
