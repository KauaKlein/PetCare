import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://681b999717018fe5057c2712.mockapi.io/login`, {
        params: {
          email: email,
          password: senha,
        },
      });

      if (response.data.length > 0) {
        login(response.data[0]); 
      } else {
        setErro('Email ou senha inválidos');
      }
    } catch (err) {
      setErro('Erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
  <div className="login-box">
    <h1>Login - PetCare</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
    {erro && <p>{erro}</p>}
  </div>
</div>

  );
}
