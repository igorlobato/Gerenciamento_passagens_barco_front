import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  // Mock data pra autocomplete
  const cities = ['Salvador', 'Ilhéus', 'Morro de São Paulo', 'Porto Seguro', 'Itaparica'];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?origin=${origin}&destination=${destination}&departure=${departureDate}&return=${returnDate}`);
  };

  return (
    <div className="search-form">
      <h2 className="search-form-title">Encontre sua passagem</h2>
      <form onSubmit={handleSubmit} className="search-form-grid">
        <div className="search-form-group">
          <label htmlFor="origin" className="search-form-label">Origem</label>
          <input
            type="text"
            id="origin"
            list="origin-options"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="search-form-input"
            required
          />
          <datalist id="origin-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div className="search-form-group">
          <label htmlFor="destination" className="search-form-label">Destino</label>
          <input
            type="text"
            id="destination"
            list="destination-options"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="search-form-input"
            required
          />
          <datalist id="destination-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div className="search-form-group">
          <label htmlFor="departureDate" className="search-form-label">Data de Ida</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="search-form-input"
            required
          />
        </div>
        <div className="search-form-group">
          <label htmlFor="returnDate" className="search-form-label">Data de Volta (opcional)</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="search-form-input"
          />
        </div>
        <div className="search-form-button-container">
          <button
            type="submit"
            className="search-form-button"
          >
            Buscar Passagens
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;