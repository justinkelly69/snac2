import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { NodeType, ElementNodeType, createElementNode, Node } from './lib/snac2/elements';
import { setId, getPath, getType } from './lib/snac2/helpers';
import { js2xml, json2xml, xml2js, xml2json } from 'xml-js';
import xml from './lib/data/xml/waffle';

const NodeList: FunctionComponent = (props) => {

  const out = xml2js(xml(), {
    compact: false,
    ignoreAttributes: false,
  });

  return (
    <pre>
      {JSON.stringify(out.elements[0], null, 4)}
    </pre>
  );
}

function App() {
  return (
    <NodeList />
  );
}

export default App;
