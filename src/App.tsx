import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { xml2snac } from './lib/snac2/xml2snac';
import xml from './lib/data/xml/waffle';

const NodeList: FunctionComponent = (props) => {

  const out = JSON.stringify(xml2snac(xml()), null, 4);

  return (
    <pre>
      {out}
    </pre>
  );
}

function App() {
  return (
    <NodeList />
  );
}

export default App;
