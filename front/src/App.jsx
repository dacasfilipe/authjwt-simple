import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componentes/login';
import Home from './componentes/home';
import Register from './componentes/register';
import { Navigate } from 'react-router-dom';
import PrivateRoute from './componentes/privateroute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route exact path="/login" element={<Login/>} />
        <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
        <Route exact path="/register" element={<Register/>} />
      </Routes>
    </Router>
  );
};
export default App;
