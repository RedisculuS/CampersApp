import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CamperDetailsPage from './pages/CamperDetailsPage/CamperDetailsPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperDetailsPage />} />
      </Routes>
    </div>
  );
}

export default App;
