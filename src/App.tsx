import  processSNAC  from './lib/snac/snac2xml';


function App() {
    const snac = processSNAC();
    return (
        <Document
            snac={snac}
            cssMode='normal'
        />
    );
}

export default App;
