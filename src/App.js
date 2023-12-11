import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//components
import Navigation from "./components/Navigation";

//views
import Splash from "./views/Splash";
import Game from './views/Game';

function App() {
  return (
    <div id="App">
       <Router>
         <Navigation />
         <Routes>
            <Route exact path='/' element={<Splash />} />
            <Route exact path='/game' element={<Game />} />
         </Routes>
       </Router>
    </div>
  );
}

export default App;
