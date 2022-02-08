import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Pokedex from "./Pokedex/Pokedex.js";
import Pokemon from "./Pokemon/Pokemon.js";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Switch looks for it's children Routes and renders the first one that matches */}
        <Routes>
          <Route path="/" element={<Pokedex/>} />
          <Route path="/:pokemonId" element={<Pokemon/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
