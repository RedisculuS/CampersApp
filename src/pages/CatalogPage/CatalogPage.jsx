import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CatalogPage = () => {
  const [campers, setCampers] = useState([]);
  const [filters, setFilters] = useState({});
  const [noResults, setNoResults] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const fetchCampers = async () => {
    const queryParams = new URLSearchParams(filters).toString(); // формуємо параметри запиту
    try {
      const response = await fetch(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryParams}`
      );
      const data = await response.json();
      if (data.items.length === 0) {
        setNoResults(true); // Якщо немає кемперів за фільтрами, встановлюємо стан noResults
      } else {
        setCampers(data.items);
        setNoResults(false); // Якщо є кемпери, скидаємо стан noResults
      }
    } catch (error) {
      console.error('Error fetching campers:', error);
      setNoResults(true); // Якщо сталася помилка при запиті, показуємо повідомлення про помилку
    }
  };

  useEffect(() => {
    fetchCampers();
  }, [filters]); // Перезапуск запиту при зміні фільтрів

  // Функція для зміни фільтрів при натисканні на кнопку
  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  const toggleFavorite = camper => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.id === camper.id)) {
        return prevFavorites.filter(fav => fav.id !== camper.id); // Видалити, якщо вже в обраних
      } else {
        return [...prevFavorites, camper]; // Додати до обраних
      }
    });
  };

  // const isFilterActive = (filterType, value) => {
  //   return filters[filterType] === value;
  // };

  return (
    <div>
      <h1>Catalog</h1>
      <p>Explore our campers collection.</p>
      {/* Campers list will be added soon */}
      <h1>Available Campers</h1>

      {/* Кнопки для фільтрації */}
      <div>
        <button onClick={() => handleFilterChange('AC', true)}>AC</button>
        <button onClick={() => handleFilterChange('transmission', 'automatic')}>
          Automatic
        </button>
        <button onClick={() => handleFilterChange('kitchen', true)}>
          Kitchen
        </button>
        <button onClick={() => handleFilterChange('TV', true)}>TV</button>
        <button onClick={() => handleFilterChange('bathroom', true)}>
          Bathroom
        </button>
        <button onClick={() => resetFilters()}>Reset filters</button>
      </div>

      {noResults ? (
        <p>
          No campers found for the selected filters. Try adjusting your filters.
        </p>
      ) : (
        <ul>
          {campers.map(camper => (
            <li key={camper.id}>
              <h2>{camper.name}</h2>
              <div>{camper.gallery.original}</div>
              <p>Price: ${camper.price}</p>
              <p>Rating: {camper.rating}</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {camper.gallery.map((image, index) => (
                  <img
                    key={index}
                    src={image.thumb}
                    alt={`${camper.name} - ${index + 1}`}
                    style={{
                      width: '100px',
                      height: 'auto',
                      borderRadius: '8px',
                    }}
                  />
                ))}
              </div>
              {/* Кнопка для переходу на сторінку деталей */}
              <Link to={`/catalog/${camper.id}`}>
                <button>View Details</button>
              </Link>
              {/* Кнопка додавання до обраних */}
              <button onClick={() => toggleFavorite(camper)}>
                {favorites.some(fav => fav.id === camper.id)
                  ? 'Remove from Favorites'
                  : 'Add to Favorites'}
              </button>
              {/* <p>{camper.AC ? 'Has AC' : 'No AC'}</p> */}
            </li>
          ))}
          <div>
            <h2>Your Favorites</h2>
            {favorites.length === 0 ? (
              <p>No favorites yet.</p>
            ) : (
              <ul>
                {favorites.map(fav => (
                  <li key={fav.id}>
                    <h3>{fav.name}</h3>
                    <img
                      src={fav.gallery[0].thumb}
                      alt={`${fav.name}`}
                      style={{ width: '100px' }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ul>
      )}
    </div>
  );
};

export default CatalogPage;
