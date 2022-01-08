import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { xml2snac } from './lib/snac2/xml2snac';
import xml from './lib/data/xml/waffle';
import XElement from './lib/jsx/element';

function App() {
  const snac = xml2snac(xml());
  return (
    <XElement snac={snac} cssPrefix='x88b' />
  );
}

export default App;
