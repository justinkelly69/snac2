import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { xml2snac } from './lib/snac2/xml2snac';
import xml from './lib/data/xml/waffle';
import { Element } from './lib/jsx/nodes/element';

function App() {
  const snac = xml2snac(xml());
  return (
    <>
      <pre>
        <Element
          showTag={true}
          snac={snac}
          cssMode='normal'
        />
      </pre>
      <pre>{JSON.stringify(snac, null, 4)}</pre>
    </>
  );
}

export default App;
