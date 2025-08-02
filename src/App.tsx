import React from 'react'
import "./App.css"

import xmlInput from './lib/data/xml/waffle'
import xml2snac from './lib/snac/xml2snac'
import snac2xml from './lib/tsx/snac2xml'
import { snacOpts } from './lib/snac/opts'
import * as FUNC from './lib/tsx/functions'

function App() {
    const snac = xml2snac(xmlInput)
    //console.log(JSON.stringify(snac, null, 4))
    const xml = snac2xml(snac, FUNC, snacOpts)

    return (
        <div>
            <div className='left-side'>{xml}</div>
            <div className='right-side'>{xml}</div>
        </div>
    )
}

export default App
