import React from 'react';
import "./App.css";

import xmlInput from './lib/data/xml/waffle'
import xml2snac from './lib/snac/xml2snac'
//import snac2xml from './lib/snac/snac2xml';
import xmlOut from './lib/tsx/snac2xml';
import { Tag, Attribute, Attributes, CDATA, CloseTag, Text, Comment, OpenTag, PI, Prefix } from './lib/tsx/outFuncs';
import {snacOpts} from './lib/snac/opts'


function App() {

    const funcs = { Tag, OpenTag, CloseTag, Text, CDATA, Comment, PI, Attributes, Attribute, Prefix }
    const snac = xml2snac(xmlInput)[0]
    const xml = xmlOut([snac], [snac], funcs, snacOpts)

    return (
        <>
            <pre>{xml}</pre>
        </>
    )
}

export default App;
