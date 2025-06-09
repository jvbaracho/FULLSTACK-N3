import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_API_URL + '/api/auth/register', {
        name,
        email,
        password,
      });
      alert('Usuário registrado com sucesso!');
    } catch (err) {
      alert('Erro no registro: ' + err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
      <button type="submit">Registrar</button>
    </form>
  );
}
