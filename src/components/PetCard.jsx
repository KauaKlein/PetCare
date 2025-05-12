export default function PetCard({ pet }) {
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', width: '200px' }}>
        <img src={pet.image} alt={pet.name} style={{ width: '100%', borderRadius: '8px' }} />
        <h3>{pet.name}</h3>
        <p>Raça: {pet.breed}</p>
        <p>Tutor: {pet.owner}</p>
      </div>
    );
  }
  