import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectSelectedCamper,
} from '../../redux/selectors';
import { fetchCamperById } from '../../redux/campersSlice';
import css from './CamperDetailsPage.module.css';
import clsx from 'clsx';

const CamperDetailsPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const selectedCamper = useSelector(selectSelectedCamper);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!selectedCamper) return <p>No camper found.</p>;

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.vehicleName}>{selectedCamper.name}</h1>
      <div className={css.ratingLocWrap}>
        <div className={css.ratLocWrap}>
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
            <path
              d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z"
              fill="#FFC531"
            />
          </svg>
          <p>
            {selectedCamper.rating}({selectedCamper.reviews.length} Reviews)
          </p>
        </div>
        <div className={css.ratLocWrap}>
          <svg width={16} height={16}>
            <use href="../../../public/svg-sprite.svg#icon-map" />
          </svg>
          <p>Location: {selectedCamper.location}</p>
        </div>
      </div>
      <p className={css.vehiclePrice}>€{selectedCamper.price.toFixed(2)}</p>

      <div className={css.imgWrap}>
        {selectedCamper.gallery.map((image, index) => (
          <img
            className={css.vehicleImg}
            key={index}
            src={image.original}
            alt={`${selectedCamper.name} - ${index + 1}`}
          />
        ))}
      </div>
      <p className={css.vehicleDescr}> {selectedCamper.description}</p>
      <ul className={css.descrTitleList}>
        <li className={css.descrTitleWrap}>
          <NavLink
            className={buildLinkClass}
            to="features"
            state={{ features: selectedCamper }}
          >
            features
          </NavLink>
        </li>
        <li className={css.descrTitleWrap}>
          <NavLink
            className={buildLinkClass}
            to="reviews"
            state={{ reviews: selectedCamper.reviews }}
          >
            reviews
          </NavLink>
        </li>
      </ul>
      <div className={css.divider}></div>

      <div className={css.bottomWrap}>
        <Outlet />

        <form>
          <h2>Booking Form</h2>
          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input type="date" id="startDate" name="startDate" required />
          </div>
          <div>
            <label htmlFor="endDate">End Date:</label>
            <input type="date" id="endDate" name="endDate" required />
          </div>
          <div>
            <label htmlFor="guests">Number of Guests:</label>
            <input
              type="number"
              id="guests"
              name="guests"
              min="1"
              max="6"
              required
            />
          </div>
          <button type="submit">Book Now</button>
        </form>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
