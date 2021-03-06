import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { xml2snac } from './lib/snac2/xml2snac';
import xml from './lib/data/xml/waffle';
import { Document } from './lib/jsx/nodes/document';

function App() {
  const snac = xml2snac(xml());
  return (
    <Document
      snac={snac}
      cssMode='normal'
    />
  );
}

export default App;
