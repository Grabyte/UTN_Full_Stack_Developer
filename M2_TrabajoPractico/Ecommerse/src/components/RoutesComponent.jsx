import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import Register from '../pages/register';
import Login from '../pages/Login';
import App from '../App';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default RoutesComponent;

