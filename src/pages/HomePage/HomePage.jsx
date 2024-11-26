import { NavLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to travel trucks</h1>
      <p>Find the best truck for your adventures!</p>
      <NavLink to="/catalog">
        <button>View Now</button>
      </NavLink>
    </div>
  );
};

export default HomePage;
