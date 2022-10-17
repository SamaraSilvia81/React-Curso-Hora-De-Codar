import HelloWorld from './components/HelloWorld'
import SayMyName from './components/SayMyName'
import Pessoa from './components/Pessoa'
import './App.css';

function App() {

  const nome = "Joshua"

  return (
    <div className="App">
      <div className="Pessoa"> 
        <Pessoa 
          nome="Samara" 
          idade="18" 
          profissao="Programadora" 
          foto="https://avatars.githubusercontent.com/u/100232025?v=4"/>
        </div>
      <div>
        <HelloWorld/>
        <SayMyName nome="Wanda"/>
        <SayMyName nome={nome}/> 
      </div>
    
    </div>
  );
}

export default App;