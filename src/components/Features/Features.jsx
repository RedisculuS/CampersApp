import { useLocation } from 'react-router-dom';
import css from './Features.module.css';

const Features = () => {
  const location = useLocation();
  const { features } = location.state || {};

  if (!features) return <p>No features available.</p>;

  return (
    <div className={css.wrapper}>
      <ul className={css.featuresList}>
        {features.transmission && (
          <li className={css.listItem}>
            <svg width={20} height={16}>
              <use href="/svg-sprite.svg#icon-diagram" />
            </svg>
            {features.transmission}
          </li>
        )}
        {features.AC && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-wind" />
            </svg>
            AC{features.AC}
          </li>
        )}
        {features.engine && (
          <li className={css.listItem}>
            <svg width={20} height={20}>
              <path d="M3.75 3.125C3.75 2.95924 3.81585 2.80027 3.93306 2.68306C4.05027 2.56585 4.20924 2.5 4.375 2.5H10.625C10.7908 2.5 10.9497 2.56585 11.0669 2.68306C11.1842 2.80027 11.25 2.95924 11.25 3.125V9.375C11.25 9.54076 11.1842 9.69973 11.0669 9.81694C10.9497 9.93415 10.7908 10 10.625 10H4.375C4.20924 10 4.05027 9.93415 3.93306 9.81694C3.81585 9.69973 3.75 9.54076 3.75 9.375V3.125Z" />
              <path d="M1.25 2.5C1.25 1.83696 1.51339 1.20107 1.98223 0.732233C2.45107 0.263392 3.08696 0 3.75 0L11.25 0C11.913 0 12.5489 0.263392 13.0178 0.732233C13.4866 1.20107 13.75 1.83696 13.75 2.5V12.5C14.413 12.5 15.0489 12.7634 15.5178 13.2322C15.9866 13.7011 16.25 14.337 16.25 15V15.625C16.25 15.7908 16.3158 15.9497 16.4331 16.0669C16.5503 16.1842 16.7092 16.25 16.875 16.25C17.0408 16.25 17.1997 16.1842 17.3169 16.0669C17.4342 15.9497 17.5 15.7908 17.5 15.625V10H16.875C16.7092 10 16.5503 9.93415 16.4331 9.81694C16.3158 9.69973 16.25 9.54076 16.25 9.375V5.46875C16.25 5.30299 16.3158 5.14402 16.4331 5.02681C16.5503 4.9096 16.7092 4.84375 16.875 4.84375H18.7437C18.73 4.24875 18.6775 3.72625 18.4925 3.31625C18.3935 3.07785 18.2209 2.87729 18 2.74375C17.77 2.60625 17.42 2.5 16.875 2.5C16.7092 2.5 16.5503 2.43415 16.4331 2.31694C16.3158 2.19973 16.25 2.04076 16.25 1.875C16.25 1.70924 16.3158 1.55027 16.4331 1.43306C16.5503 1.31585 16.7092 1.25 16.875 1.25C17.58 1.24833 18.1683 1.38833 18.64 1.67C19.1187 1.955 19.4325 2.35875 19.6325 2.80375C20.0013 3.6225 20 4.635 20 5.405V9.37375C20.0002 9.45593 19.9841 9.53734 19.9528 9.61331C19.9214 9.68928 19.8754 9.75833 19.8174 9.8165C19.7593 9.87467 19.6904 9.92082 19.6145 9.95231C19.5386 9.98379 19.4572 10 19.375 10H18.75V15.625C18.75 16.1223 18.5525 16.5992 18.2008 16.9508C17.8492 17.3025 17.3723 17.5 16.875 17.5C16.3777 17.5 15.9008 17.3025 15.5492 16.9508C15.1975 16.5992 15 16.1223 15 15.625V15C15 14.6685 14.8683 14.3505 14.6339 14.1161C14.3995 13.8817 14.0815 13.75 13.75 13.75V18.75H14.375C14.5408 18.75 14.6997 18.8158 14.8169 18.9331C14.9342 19.0503 15 19.2092 15 19.375C15 19.5408 14.9342 19.6997 14.8169 19.8169C14.6997 19.9342 14.5408 20 14.375 20H0.625C0.45924 20 0.300269 19.9342 0.183058 19.8169C0.065848 19.6997 0 19.5408 0 19.375C0 19.2092 0.065848 19.0503 0.183058 18.9331C0.300269 18.8158 0.45924 18.75 0.625 18.75H1.25V2.5ZM12.5 2.5C12.5 2.16848 12.3683 1.85054 12.1339 1.61612C11.8995 1.3817 11.5815 1.25 11.25 1.25H3.75C3.41848 1.25 3.10054 1.3817 2.86612 1.61612C2.6317 1.85054 2.5 2.16848 2.5 2.5V18.75H12.5V2.5Z" />
            </svg>
            {features.engine}
          </li>
        )}
        {features.bathroom && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-shower" />
            </svg>
            bathroom{features.bathroom}
          </li>
        )}
        {features.kitchen && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-cup-hot" />
            </svg>
            kitchen{features.kitchen}
          </li>
        )}
        {features.TV && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-tv" />
            </svg>
            TV{features.TV}
          </li>
        )}
        {features.radio && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-radio" />
            </svg>
            radio{features.radio}
          </li>
        )}
        {features.refrigerator && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-solar_fridge-outline" />
            </svg>
            refrigerator{features.refrigerator}
          </li>
        )}
        {features.microwave && (
          <li className={css.listItem}>
            <svg width="18" height="17" fill="none">
              <path
                d="M15.6667 1.33331H2.33335C1.41288 1.33331 0.666687 2.07951 0.666687 2.99998V12.1666C0.666687 13.0871 1.41288 13.8333 2.33335 13.8333H15.6667C16.5872 13.8333 17.3334 13.0871 17.3334 12.1666V2.99998C17.3334 2.07951 16.5872 1.33331 15.6667 1.33331Z"
                stroke="#101828"
              />
              <path
                d="M9.83333 4.66669H4.83333C4.3731 4.66669 4 5.03978 4 5.50002V9.66669C4 10.1269 4.3731 10.5 4.83333 10.5H9.83333C10.2936 10.5 10.6667 10.1269 10.6667 9.66669V5.50002C10.6667 5.03978 10.2936 4.66669 9.83333 4.66669Z"
                stroke="#101828"
              />
              <path
                d="M14 4.66669V10.5M4 13.8334V15.5M14 13.8334V15.5"
                stroke="#101828"
              />
            </svg>
            microwave{features.microwave}
          </li>
        )}
        {features.gas && (
          <li className={css.listItem}>
            <svg width={20} height={18}>
              <use href="/svg-sprite.svg#icon-hugeicons_gas-stove" />
            </svg>
            gas{features.gas}
          </li>
        )}
        {features.water && (
          <li className={css.listItem}>
            <svg width="20" height="20" fill="none">
              <path
                d="M15.625 12.5C15.625 15.952 13.452 18.125 10 18.125C6.54805 18.125 4.375 15.952 4.375 12.5C4.375 8.79571 8.40742 3.79492 9.64414 2.34844C9.68815 2.29705 9.74276 2.25579 9.80422 2.2275C9.86568 2.19922 9.93254 2.18457 10.0002 2.18457C10.0679 2.18457 10.1347 2.19922 10.1962 2.2275C10.2576 2.25579 10.3122 2.29705 10.3562 2.34844C11.5926 3.79492 15.625 8.79571 15.625 12.5Z"
                stroke="#101828"
              />
              <path
                d="M13.4375 12.8125C13.4375 13.5584 13.1412 14.2738 12.6137 14.8012C12.0863 15.3287 11.3709 15.625 10.625 15.625"
                stroke="#101828"
              />
            </svg>
            water{features.water}
          </li>
        )}
      </ul>
      <h3 className={css.detailsTitle}>Vehicle details</h3>
      <div className={css.divider}></div>
      <ul className={css.detailsList}>
        {features.form && (
          <li className={css.detailsListItem}>
            <p>Form</p>
            {features.form}
          </li>
        )}
        {features.length && (
          <li className={css.detailsListItem}>
            <p>Length</p>
            {features.length}
          </li>
        )}
        {features.width && (
          <li className={css.detailsListItem}>
            <p>Width</p>
            {features.width}
          </li>
        )}
        {features.height && (
          <li className={css.detailsListItem}>
            <p>Height</p>
            {features.height}
          </li>
        )}
        {features.tank && (
          <li className={css.detailsListItem}>
            <p>Tank</p>
            {features.tank}
          </li>
        )}
        {features.consumption && (
          <li className={css.detailsListItem}>
            <p>Consumption</p>
            {features.consumption}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Features;
