import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Substitua pela URL do seu endpoint de login
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha:password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token); // Armazenando o token
        navigate('/home');  // Redireciona para /home
    } else {
        alert('Falha no login!');
    }
};

// Estilos CSS para centralizar o formulário completamente
const containerStyle = {
  display: 'flex',
  justifyContent: 'center', // Centraliza horizontalmente
  alignItems: 'center', // Centraliza verticalmente
  height: '100vh', // Altura total da tela
};

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px', // Espaçamento entre os campos do formulário
};

return (
  <div style={containerStyle}>
    <div style={formContainerStyle}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem conta? <Link to="/register">Registre-se</Link></p>
    </div>
  </div>
);
};

export default Login;