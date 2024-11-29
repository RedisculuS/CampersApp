import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectFavorites, selectFilters } from '../../redux/selectors';
import {
  fetchCampers,
  loadMoreCampers,
  resetCampers,
  toggleFavorite,
} from '../../redux/campersSlice';
import Filters from '../../components/Filters/Filters';
import css from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  const campers = useSelector(state => state.campers.displayedCampers);
  const allCampers = useSelector(state => state.campers.campers);
  const filters = useSelector(selectFilters);
  const favorites = useSelector(selectFavorites);
  const loading = useSelector(state => state.campers.loading);
  const error = useSelector(state => state.campers.error);

  useEffect(() => {
    dispatch(resetCampers());
    dispatch(fetchCampers(filters));
  }, [filters, dispatch]);

  const handleToggleFavorite = camper => {
    dispatch(toggleFavorite(camper));
  };

  const handleLoadMore = () => {
    const nextCampers = allCampers.slice(campers.length, campers.length + 4);
    dispatch(loadMoreCampers(nextCampers));
  };

  return (
    <div className={css.wrapper}>
      <Filters />

      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error}</p> : null}

      {!loading && campers.length === 0 && <p>No campers found.</p>}

      <div>
        <ul>
          {campers.map(camper => (
            <li className={css.vehicleListItem} key={camper.id}>
              <img
                className={css.vehicleImg}
                key={0}
                src={camper.gallery[0]?.thumb}
                alt={`${camper.name} - 1`}
              />
              <div>
                <div className={css.vehicleTitleWrap}>
                  <h2 className={css.vehicleName}>{camper.name}</h2>
                  <div className={css.favWrap}>
                    <p className={css.vehicleName}>
                      €{camper.price.toFixed(2)}
                    </p>
                    <button onClick={() => handleToggleFavorite(camper)}>
                      {favorites.some(fav => fav.id === camper.id)
                        ? 'Remove from Favorites'
                        : 'Add to Favorites'}
                    </button>
                  </div>
                </div>

                <p>
                  Rating: {camper.rating}({camper.reviews.length} Reviews)
                </p>
                <p>{camper.description}</p>
                <button className={css.showMoreBtn}>
                  <Link
                    to={`/catalog/${camper.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Show more
                  </Link>
                </button>
              </div>
            </li>
          ))}
        </ul>
        {allCampers.length > campers.length && (
          <button className={css.loadMoreBtn} onClick={handleLoadMore}>
            Load More
          </button>
        )}
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
    </div>
  );
};

export default CatalogPage;
