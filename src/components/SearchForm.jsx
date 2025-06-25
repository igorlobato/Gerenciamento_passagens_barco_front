import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  // Mock data pra autocomplete (substituir por API depois)
  const cities = ['Salvador', 'Ilhéus', 'Morro de São Paulo', 'Porto Seguro', 'Itaparica'];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redireciona pra página de resultados (placeholder)
    navigate(`/search?origin=${origin}&destination=${destination}&departure=${departureDate}&return=${returnDate}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto -mt-20 relative z-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Encontre sua passagem</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">Origem</label>
          <input
            type="text"
            id="origin"
            list="origin-options"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <datalist id="origin-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino</label>
          <input
            type="text"
            id="destination"
            list="destination-options"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
          <datalist id="destination-options">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>
        <div>
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">Data de Ida</label>
          <input
            type="date"
            id="departureDate"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">Data de Volta (opcional)</label>
          <input
            type="date"
            id="returnDate"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Buscar Passagens
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;