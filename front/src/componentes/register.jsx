import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/register', { usuario, email, senha });
      console.log(res.data);
      alert('Usuário registrado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao registrar usuário.');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder="Usuário" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
