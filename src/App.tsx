import XML2SNAC from './lib/snac/xml2snac'
import SNAC2XML from './lib/snac/snac2xml';
import xml1 from './lib/data/xml/waffle'

function App() {
    const xml2snac = new XML2SNAC(true, true)
    const snac = xml2snac.render(xml1);
    const snac2xml = new SNAC2XML({
        PREFIX_SHOW_PREFIX: false,
        PREFIX_NEWLINE: "\n",
        PREFIX_USE_PREFIX: true,
        PREFIX_START_CHAR: "",
        PREFIX_CHAR_ON: "\t",
        PREFIX_ATTRIBUTE_PREFIX: "  ",
        XML_SELF_CLOSE_TAGS: false,
        XML_TRIM_TEXT: true,
        XML_ALLOW_COMMENTS: true,
        XML_ALLOW_PI: true,
    })
    const xml2 = snac2xml.render(snac)
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
