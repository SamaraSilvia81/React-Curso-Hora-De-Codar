import { BrowserRouter as Router, Routes ,Route } from "react-router-dom"
import {Home} from './pages/Home';
import {Empresa} from './pages/Empresa';
import {Contato} from './pages/Contato';
import {NavBar} from './layout/NavBar';
import {Footer} from './layout/Footer';
import './App.css';

function App() {

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/empresa' element={<Empresa />} />
          <Route path='/contato' element={<Contato />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;