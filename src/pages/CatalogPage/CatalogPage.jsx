import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectFavorites,
  selectFilteredCampers,
  selectFilters,
} from '../../redux/selectors';
import {
  fetchCampers,
  resetCampers,
  setFilters,
  toggleFavorite,
} from '../../redux/campersSlice';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const campers = useSelector(selectFilteredCampers);
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(state => state.campers.loading);
  const error = useSelector(state => state.campers.error);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (filterType, value) => {
    dispatch(setFilters({ ...filters, [filterType]: value }));
  };

  const resetFilters = () => {
    dispatch(setFilters({}));
  };

  const handleToggleFavorite = camper => {
    dispatch(toggleFavorite(camper));
  };

  return (
    <div>
      <h1>Catalog</h1>
      <p>Explore our campers collection.</p>

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

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}

      {!loading && campers.length === 0 && <p>No campers found.</p>}

      <ul>
        {campers.map(camper => (
          <li key={camper.id}>
            <h2>{camper.name}</h2>
            <div>{camper.gallery[0]?.original}</div>
            <p>Price: ${camper.price.toFixed(2)}</p>
            <p>Rating: {camper.rating}</p>
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
            <button onClick={() => handleToggleFavorite(camper)}>
              {favorites.some(fav => fav.id === camper.id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
            <Link
              to={`/catalog/${camper.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Show more
            </Link>
          </li>
        ))}
      </ul>

      <div>
        <h2>Your Favorites</h2>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <ul>
            {favorites.map(fav => (
              <li key={fav.id}>
                <h3>{fav.name}</h3>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
