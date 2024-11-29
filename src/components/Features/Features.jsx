import { useLocation } from 'react-router-dom';

const Features = () => {
  const location = useLocation();
  const { features } = location.state || {}; // Отримуємо дані з state

  if (!features) return <p>No features available.</p>;

  return (
    <ul>
      {features.AC && <li>Air Conditioning</li>}
      {features.bathroom && <li>Bathroom</li>}
      {features.kitchen && <li>Kitchen</li>}
      {features.TV && <li>TV</li>}
      {features.radio && <li>Radio</li>}
      {features.refrigerator && <li>Refrigerator</li>}
      {features.microwave && <li>Microwave</li>}
      {features.gas && <li>Gas</li>}
      {features.water && <li>Water Supply</li>}
    </ul>
  );
};

export default Features;
