import { Routes, Route } from "react-router";



import Header from "./components/header";
import RaceCar from './games/dodgecubes';
import MyPhotos from './photos/index';
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

      <div style={{marginTop: '4.5em'}}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/upcoming" element={<Extras />} />
          <Route path="/Game/DodgeCubes" element={<RaceCar />} />
          <Route path="/pokemons" element={<PHome />} />
          <Route path="/MyPhotos" element={<MyPhotos />} />
        </Routes>
      </div>
    </>
  );
};

export default App;