import { useSelector, useDispatch } from 'react-redux';
import {
  setTempFilters,
  resetFilters,
  setFilters,
} from '../../redux/campersSlice';
import css from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const tempFilters = useSelector(state => state.campers.tempFilters);

  const handleTempFilterChange = (filterType, value) => {
    dispatch(setTempFilters({ ...tempFilters, [filterType]: value }));
  };

  const applyFilters = () => {
    const activeFilters = Object.entries(tempFilters).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      },
      {}
    );
    dispatch(setFilters(activeFilters));
  };

  const resetAllFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <div className={css.wrapper}>
      <div>
        <p className={css.locationText}>Location</p>
        <div>
          {/* <svg>
            <use href="../../public/svg-sprite.svg#icon-tv>" />
          </svg> */}
          <input
            className={css.locationInput}
            id="location"
            type="text"
            placeholder="City"
            value={tempFilters.location || ''}
            onChange={e => handleTempFilterChange('location', e.target.value)}
          />
        </div>
      </div>
      <p className={css.filtersWrapText}>Filters</p>
      <div className={css.vehileWrap}>
        <p className={css.filterSectionHeader}>Vehicle equipment</p>
        <div className={css.divider}></div>
        <div className={css.vehicleBtnWrap}>
          <button
            className={css.vehicleBtn}
            onClick={() => handleTempFilterChange('AC', !tempFilters.AC)}
          >
            AC {tempFilters.AC ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange(
                'transmission',
                tempFilters.transmission === 'automatic' ? '' : 'automatic'
              )
            }
          >
            Automatic {tempFilters.transmission === 'automatic' ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange('kitchen', !tempFilters.kitchen)
            }
          >
            Kitchen {tempFilters.kitchen ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() => handleTempFilterChange('TV', !tempFilters.TV)}
          >
            TV {tempFilters.TV ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange('bathroom', !tempFilters.bathroom)
            }
          >
            Bathroom {tempFilters.bathroom ? '✓' : ''}
          </button>
        </div>
      </div>

      <div className={css.vehileWrap}>
        <p className={css.filterSectionHeader}>Vehicle type</p>
        <div className={css.divider}></div>
        <div className={css.vehicleBtnWrap}>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'panelTruck' ? '' : 'panelTruck'
              )
            }
          >
            van {tempFilters.form === 'panelTruck' ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'alcove' ? '' : 'alcove'
              )
            }
          >
            Alcove {tempFilters.form === 'alcove' ? '✓' : ''}
          </button>
          <button
            className={css.vehicleBtn}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'fullyIntegrated' ? '' : 'fullyIntegrated'
              )
            }
          >
            fullyIntegrated {tempFilters.form === 'fullyIntegrated' ? '✓' : ''}
          </button>
        </div>
      </div>
      <div className={css.btnFilterWrap}>
        <button className={css.filterBtn} onClick={applyFilters}>
          Search
        </button>
        <button className={css.filterBtn} onClick={resetAllFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
