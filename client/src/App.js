import "./App.css";
import Header from './components/header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Customers from "./components/customers";
import AddCustomer from "./components/addCustomer";
function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Customers/>}/>
          <Route path="/addCustomer" element={<AddCustomer/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
