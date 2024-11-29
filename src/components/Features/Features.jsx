import { useLocation } from 'react-router-dom';
import css from './Features.module.css';

const Features = () => {
  const location = useLocation();
  const { features } = location.state || {}; // Отримуємо дані з state

  if (!features) return <p>No features available.</p>;

  return (
    <div className={css.wrapper}>
      <ul>
        {features.transmission && <li>{features.transmission}</li>}
        {features.engine && <li>{features.engine}</li>}
        {features.AC && <li>{features.AC}</li>}
        {features.bathroom && <li>{features.bathroom}</li>}
        {features.kitchen && <li>{features.kitchen}</li>}
        {features.TV && <li>{features.TV}</li>}
        {features.radio && <li>{features.radio}</li>}
        {features.refrigerator && <li>{features.refrigerator}</li>}
        {features.microwave && <li>{features.microwave}</li>}
        {features.gas && <li>{features.gas}</li>}
        {features.water && <li>{features.water}</li>}
      </ul>
      <h3>Vehicle details</h3>
      <ul>
        {features.form && (
          <li>
            <p>Form</p>
            {features.form}
          </li>
        )}
        {features.length && (
          <li>
            <p>Length</p>
            {features.length}
          </li>
        )}
        {features.width && (
          <li>
            <p>Width</p>
            {features.width}
          </li>
        )}
        {features.height && (
          <li>
            <p>Height</p>
            {features.height}
          </li>
        )}
        {features.tank && (
          <li>
            <p>Tank</p>
            {features.tank}
          </li>
        )}
        {features.consumption && (
          <li>
            <p>Consumption</p>
            {features.consumption}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Features;
