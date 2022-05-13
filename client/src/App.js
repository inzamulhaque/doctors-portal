import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Shared/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signin from './Pages/Signin/Signin';
import Appointment from './Pages/Appointment/Appointment';
import SignUp from './Pages/Signin/SignUp';
import RequireAuth from './Pages/Signin/RequireAuth';

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/aapointment" element={<RequireAuth>
            <Appointment />
          </RequireAuth>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
