import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { xml2snac } from './lib/snac2/xml2snac';
import xml from './lib/data/xml/waffle';
import Element from './lib/jsx/element';

function App() {
  const snac = xml2snac(xml());
  return (
    <pre>
      <Element snac={snac} cssPrefix='x88b' />
    </pre>
  );
}

export default App;
