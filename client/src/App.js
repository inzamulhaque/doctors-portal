import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './Pages/Shared/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Signin from './Pages/Signin/Signin';
import Appointment from './Pages/Appointment/Appointment';
import Dashboard from './Pages/Dashboard/Dashboard';
import SignUp from './Pages/Signin/SignUp';
import RequireAuth from './Pages/Signin/RequireAuth';
import RequireAdmin from './Pages/Signin/RequireAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyAppointments from './Pages/Dashboard/MyAppointments';
import MyReview from './Pages/Dashboard/MyReview';
import MyHistory from './Pages/Dashboard/MyHistory';
import Users from './Pages/Dashboard/Users';
import AddDoctor from './Pages/Dashboard/AddDoctor';
import ManageDoctor from './Pages/Dashboard/ManageDoctor';
import Payment from './Pages/Dashboard/Payment';

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/appointment" element={<RequireAuth>
            <Appointment />
          </RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth>
            <Dashboard />
          </RequireAuth>} >
            <Route index element={<MyAppointments />} />
            <Route path="review" element={<MyReview />} />
            <Route path="history" element={<MyHistory />} />
            <Route path="payment/:id" element={<Payment />} />
            <Route path="users" element={<RequireAdmin>
              <Users />
            </RequireAdmin>} />
            <Route path="addDoctor" element={<RequireAdmin>
              <AddDoctor />
            </RequireAdmin>} />
            <Route path="manageDoctor" element={<RequireAdmin>
              <ManageDoctor />
            </RequireAdmin>} />
          </Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
