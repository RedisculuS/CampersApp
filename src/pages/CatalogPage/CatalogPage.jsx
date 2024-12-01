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
import LinesEllipsis from 'react-lines-ellipsis';
import Loader from '../../components/Loader/Loader';

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
      <div>
        <Filters />
        <div className={css.favWrap}>
          <h2 className={css.favListTitle}>Your Favorites</h2>
          <div className={css.divider}></div>
          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            <ul className={css.favList}>
              {favorites.map(fav => (
                <li key={fav.id}>
                  <Link
                    to={`/catalog/${fav.id}`}
                    className={css.favListItemDescr}
                  >
                    {fav.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div>{loading ? <Loader className={css.loader} /> : null}</div>

      {error ? <p>Error: {error}</p> : null}

      {!loading && campers.length === 0 && <p>No campers found.</p>}

      <div className={css.listWrap}>
        <ul className={css.campersList}>
          {campers.map(camper => (
            <li className={css.vehicleListItem} key={camper.id}>
              <img
                className={css.vehicleImg}
                key={0}
                src={camper.gallery[0]?.thumb}
                alt={`${camper.name} - 1`}
              />
              <div className={css.cardInfoWrap}>
                <div className={css.vehicleTitleWrap}>
                  <h2 className={css.vehicleName}>{camper.name}</h2>
                  <div className={css.favInCardWrap}>
                    <p className={css.vehicleName}>
                      €{camper.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleToggleFavorite(camper)}
                      className={css.favBtn}
                    >
                      <svg
                        className={`${css.favIcon} ${
                          favorites.some(fav => fav.id === camper.id)
                            ? css.active
                            : ''
                        }`}
                      >
                        <use href="/svg-sprite.svg#icon-heart"></use>
                      </svg>
                      {favorites.some(fav => fav.id === camper.id)}
                    </button>
                  </div>
                </div>
                <div className={css.ratingLocWrap}>
                  <p className={css.camperRating}>
                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
                      <path
                        d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z"
                        fill="#FFC531"
                      />
                    </svg>
                    <div>
                      {camper.rating}({camper.reviews.length} Reviews)
                    </div>
                  </p>
                  <div className={css.locationWrap}>
                    <svg className={css.iconMap}>
                      <use href="/svg-sprite.svg#icon-map" />
                    </svg>
                    <p className={css.locationTitle}>{camper.location}</p>
                  </div>
                </div>

                <LinesEllipsis
                  text={camper.description}
                  maxLine="1"
                  ellipsis="..."
                  basedOn="letters"
                  className={css.camperDescr}
                />

                <ul className={css.inCardList}>
                  {camper.transmission ? (
                    <li className={css.inCardListItem}>
                      <svg width={20} height={16}>
                        <use href="/svg-sprite.svg#icon-diagram" />
                      </svg>
                      {camper.transmission}
                    </li>
                  ) : (
                    ''
                  )}
                  {camper.engine ? (
                    <li className={css.inCardListItem}>
                      <svg width={20} height={20}>
                        <path d="M3.75 3.125C3.75 2.95924 3.81585 2.80027 3.93306 2.68306C4.05027 2.56585 4.20924 2.5 4.375 2.5H10.625C10.7908 2.5 10.9497 2.56585 11.0669 2.68306C11.1842 2.80027 11.25 2.95924 11.25 3.125V9.375C11.25 9.54076 11.1842 9.69973 11.0669 9.81694C10.9497 9.93415 10.7908 10 10.625 10H4.375C4.20924 10 4.05027 9.93415 3.93306 9.81694C3.81585 9.69973 3.75 9.54076 3.75 9.375V3.125Z" />
                        <path d="M1.25 2.5C1.25 1.83696 1.51339 1.20107 1.98223 0.732233C2.45107 0.263392 3.08696 0 3.75 0L11.25 0C11.913 0 12.5489 0.263392 13.0178 0.732233C13.4866 1.20107 13.75 1.83696 13.75 2.5V12.5C14.413 12.5 15.0489 12.7634 15.5178 13.2322C15.9866 13.7011 16.25 14.337 16.25 15V15.625C16.25 15.7908 16.3158 15.9497 16.4331 16.0669C16.5503 16.1842 16.7092 16.25 16.875 16.25C17.0408 16.25 17.1997 16.1842 17.3169 16.0669C17.4342 15.9497 17.5 15.7908 17.5 15.625V10H16.875C16.7092 10 16.5503 9.93415 16.4331 9.81694C16.3158 9.69973 16.25 9.54076 16.25 9.375V5.46875C16.25 5.30299 16.3158 5.14402 16.4331 5.02681C16.5503 4.9096 16.7092 4.84375 16.875 4.84375H18.7437C18.73 4.24875 18.6775 3.72625 18.4925 3.31625C18.3935 3.07785 18.2209 2.87729 18 2.74375C17.77 2.60625 17.42 2.5 16.875 2.5C16.7092 2.5 16.5503 2.43415 16.4331 2.31694C16.3158 2.19973 16.25 2.04076 16.25 1.875C16.25 1.70924 16.3158 1.55027 16.4331 1.43306C16.5503 1.31585 16.7092 1.25 16.875 1.25C17.58 1.24833 18.1683 1.38833 18.64 1.67C19.1187 1.955 19.4325 2.35875 19.6325 2.80375C20.0013 3.6225 20 4.635 20 5.405V9.37375C20.0002 9.45593 19.9841 9.53734 19.9528 9.61331C19.9214 9.68928 19.8754 9.75833 19.8174 9.8165C19.7593 9.87467 19.6904 9.92082 19.6145 9.95231C19.5386 9.98379 19.4572 10 19.375 10H18.75V15.625C18.75 16.1223 18.5525 16.5992 18.2008 16.9508C17.8492 17.3025 17.3723 17.5 16.875 17.5C16.3777 17.5 15.9008 17.3025 15.5492 16.9508C15.1975 16.5992 15 16.1223 15 15.625V15C15 14.6685 14.8683 14.3505 14.6339 14.1161C14.3995 13.8817 14.0815 13.75 13.75 13.75V18.75H14.375C14.5408 18.75 14.6997 18.8158 14.8169 18.9331C14.9342 19.0503 15 19.2092 15 19.375C15 19.5408 14.9342 19.6997 14.8169 19.8169C14.6997 19.9342 14.5408 20 14.375 20H0.625C0.45924 20 0.300269 19.9342 0.183058 19.8169C0.065848 19.6997 0 19.5408 0 19.375C0 19.2092 0.065848 19.0503 0.183058 18.9331C0.300269 18.8158 0.45924 18.75 0.625 18.75H1.25V2.5ZM12.5 2.5C12.5 2.16848 12.3683 1.85054 12.1339 1.61612C11.8995 1.3817 11.5815 1.25 11.25 1.25H3.75C3.41848 1.25 3.10054 1.3817 2.86612 1.61612C2.6317 1.85054 2.5 2.16848 2.5 2.5V18.75H12.5V2.5Z" />
                      </svg>
                      {camper.engine}
                    </li>
                  ) : (
                    ''
                  )}
                  {camper.kitchen ? (
                    <li className={css.inCardListItem}>
                      <svg width={20} height={20}>
                        <use href="/svg-sprite.svg#icon-cup-hot" />
                      </svg>
                      {camper.kitchen}Kitchen
                    </li>
                  ) : (
                    ''
                  )}
                  {camper.AC ? (
                    <li className={css.inCardListItem}>
                      <svg width={20} height={18}>
                        <use href="/svg-sprite.svg#icon-wind" />
                      </svg>
                      AC {camper.AC}
                    </li>
                  ) : (
                    ''
                  )}
                </ul>

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

          {allCampers.length > campers.length && (
            <button className={css.loadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CatalogPage;
