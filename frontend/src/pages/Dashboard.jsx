import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <div>
      <h2>Bem-vindo ao Painel</h2>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
