import { Grid } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = ({ size = 80, color = '#e44848' }) => (
  <div className={css.loaderWrapper}>
    <Grid
      height={size}
      width={size}
      color={color}
      ariaLabel="grid-loading"
      visible={true}
    />
  </div>
);

export default Loader;
