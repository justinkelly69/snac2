import React from 'react';
import "../App.css";

import xmlInput from '../lib/data/xml/waffle'
import xml2snac from '../lib/snac/xml2snac'
import xmlOut from '../lib/tsx/snac2xml';
import { snacOpts } from '../lib/snac/opts'

import {
    Tag,
    Attribute,
    Attributes,
    CDATA,
    CloseTag,
    Text,
    Comment,
    OpenTag,
    PI,
    Prefix
} from '../lib/tsx/functions';

function App() {

    const funcs = {
        Tag,
        OpenTag,
        CloseTag,
        Text,
        CDATA,
        Comment,
        PI,
        Attributes,
        Attribute,
        Prefix
    }

    const snac = xml2snac(xmlInput)[0]
    const xml = xmlOut([snac], funcs, snacOpts)

    return (
        <div>
            <div className='left-side'>{xml}</div>
            <div className='right-side'></div>
        </div>
    )
}

export default App;
