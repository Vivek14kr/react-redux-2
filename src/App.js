import logo from './logo.svg';
import './App.css';
import { Home } from "./components/Home";
import { TodoDetails } from './components/TodoDetails';
import {Total} from "./components/Total"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/todos/:todoid" element={<TodoDetails />}></Route>
        <Route path="/Total" element={<Total />}></Route>
      </Routes>
    </div>
  );
}

export default App;
