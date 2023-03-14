import {SeuNome} from './components/lift/SeuNome';
import {Saudacao} from './components/lift/Saudacao';
import { useState } from "react"
import './App.css';

function App() {

  const [nome, setNome] = useState('');

  return (
    <div className="App">
        <h1>State Lift</h1>
        <SeuNome nome={nome} setNome={setNome} />
        <Saudacao nome={nome}/>
    </div>
  );
}

export default App;