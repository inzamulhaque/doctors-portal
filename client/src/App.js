import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Shared/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signin from './Pages/Signin/Signin';
import Appointment from './Pages/Appointment/Appointment';

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/aapointment" element={<Appointment />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
