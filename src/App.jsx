import { Routes, Route } from "react-router";

import Header from "./components/header";
import Projects from './projects';
import Contact from './contact';
import PHome from './pokemons';
import Extras from './extras';
import About from './about';
import Home from "./home";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {

  return (
    <>
      <Header />

      <div style={{marginTop: '4em', textAlign: 'center'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/upcoming" element={<Extras />} />
          <Route path="/pokemons" element={<PHome />} />
        </Routes>
      </div>
    </>
  );
};

export default App;