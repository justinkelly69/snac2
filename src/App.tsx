import React, { FunctionComponent } from 'react';
import logo from './logo.svg';
import { NodeType, ElementNodeType, createElementNode } from './lib/snac2/elements';
import { setId, getPath, getType } from './lib/snac2/helpers';
import './App.css';

const NodeList: FunctionComponent = (props) => {

  const type = 'N';
  const treeId = '90210';
  const path = [2, 3, 5, 7];
  const names = ['groucho', 'chico', 'harpo', 'laurel', 'hardy', 'abbot', 'costello', 'donald', 'mickey', 'goofy'];
  const paths: Array<string> = [];
  const nodes: Array<ElementNodeType> = [];

  for (let index = 0; index < 10; index++) {
    paths.push(setId(type, treeId, path, index));
    nodes.push(createElementNode({
      ns: 'fo',
      name: names[index],
      treeId: treeId,
      path: path,
      index: index,
    }))
  }

  return (
    <ul>
      {
        paths.map((p, i) => {
          const node = nodes[i];
          return (<li key={i}>"{p}" {node.S}:{node.N}{'--'}{getPath(node).join('_')}{'--'}{getType(node)}</li>);
        })
      }
    </ul>
  );
}

function App() {
  return (
    <NodeList />
  );
}

export default App;
