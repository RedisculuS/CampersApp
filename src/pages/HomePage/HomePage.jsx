import { NavLink } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={css.container}>
      <h1 className={css.mainText}>Campers of your dreams</h1>
      <p className={css.secondaryText}>
        You can find anything you want in our catalog
      </p>
      <NavLink to="/catalog">
        <button className={css.btnToCatalog}>View Now</button>
      </NavLink>
    </div>
  );
};

export default HomePage;
