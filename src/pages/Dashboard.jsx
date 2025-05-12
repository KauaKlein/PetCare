import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import PetCard from '../components/PetCard';
import './Dashboard.css';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState('');

  useEffect(() => {
    async function fetchPets() {
      try {
        const { data } = await axios.get('https://681b999717018fe5057c2712.mockapi.io/pets');

        const petsComImagem = await Promise.all(
            data.map(async (pet) => {
              const res = await axios.get('https://dog.ceo/api/breeds/image/random');
              return { ...pet, image: res.data.message };
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

  const breeds = [...new Set(pets.map(p => p.breed).filter(Boolean))];

  const filteredPets = selectedBreed
    ? pets.filter(pet => pet.breed === selectedBreed)
    : pets;

  return (
    <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Olá, {user?.name}!</h1>
      <button className="logout-button" onClick={logout}>Sair</button>
    </div>
  
    <div className="dashboard-controls">
      <h2>Pets cadastrados:</h2>
      <div className="breed-filter">
        <label>Filtrar por raça:</label>
        <select
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="">Todas</option>
          {breeds.map((breed, i) => (
            <option key={i} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>
    </div>
  
    {loading ? (
      <p>Carregando pets...</p>
    ) : (
      <div className="pet-list">
        {filteredPets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            <img src={pet.image} alt={pet.name} />
            <h3>{pet.name}</h3>
            <p>Raça: {pet.breed}</p>
            <p>Tutor: {pet.owner}</p>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
}
