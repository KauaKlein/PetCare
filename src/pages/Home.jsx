import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PetCard from '../components/PetCard';
import './Home.css';


export default function Home() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const { data } = await axios.get('https://681b999717018fe5057c2712.mockapi.io/pets');
        const ultimos3 = [...data].slice(-3).reverse();

        const petsComImagem = await Promise.all(
          ultimos3.map(async (pet) => {
            const { data } = await axios.get('https://dog.ceo/api/breeds/image/random');
            return { ...pet, image: data.message };
          })
        );

        setPets(petsComImagem);
      } catch (error) {
        console.error('Erro ao buscar pets:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  return (
    <div className="home-container">
    <h1 className="home-title">Bem-vindo à Clínica PetCare!</h1>
  
    <div className="pet-list">
      {pets.map((pet) => (
        <div key={pet.id} className="pet-card">
          <img src={pet.image} alt={pet.name} />
          <h3>{pet.name}</h3>
          <p>Raça: {pet.breed}</p>
          <p>Tutor: {pet.owner}</p>
        </div>
      ))}
    </div>
  
    <Link to="/login" className="login-button">
      Entrar como Funcionário
    </Link>
  </div>
  );
}
