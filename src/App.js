import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//components
import Navigation from "./components/Navigation";

//views
import Game from "./views/Game";

function App() {
  return (
    <div id="App">
       <Router>
         <Navigation />
         <Routes>
            <Route exact path='/' element={<Game />} />
         </Routes>
       </Router>
    </div>
  );
}

export default App;
