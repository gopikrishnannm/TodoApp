import LoginComponent from "./Comonents/LoginComponent";
import {BrowserRouter, Route, Router, Routes} from 'react-router-dom';
import WelcomeComponent from "./Comonents/WelcomeComponent";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<LoginComponent/>}/>
            <Route path="/welcome" element={WelcomeComponent}/>
            



          </Routes>
        
        </BrowserRouter>
        
    </div>
  );
}

export default App;
