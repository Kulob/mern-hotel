import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Hotel from './pages/hotel/Hotel';
import List from './pages/list/List';
import Login from './pages/login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './pages/register/Register';
import CheckoutSuccess from './components/checkoutSuccess/CheckoutSuccess';
import { userInputs } from './formSource';
import Orders from './pages/order/Order';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/order/:id" element={<Orders />} />
        <Route path="/success/:id" element={<CheckoutSuccess />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register inputs={userInputs} />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
