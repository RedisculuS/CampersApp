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
        <div className={css.inputWrap}>
          <input
            className={css.locationInput}
            id="location"
            type="text"
            placeholder="City"
            value={tempFilters.location || ''}
            onChange={e => handleTempFilterChange('location', e.target.value)}
          />
          <svg className={css.inputIcon}>
            <use href="../../../public/svg-sprite.svg#icon-map" />
          </svg>
        </div>
      </div>
      <p className={css.filtersWrapText}>Filters</p>
      <div className={css.vehileWrap}>
        <p className={css.filterSectionHeader}>Vehicle equipment</p>
        <div className={css.divider}></div>
        <div className={css.vehicleBtnWrap}>
          <button
            className={`${css.vehicleBtn} ${tempFilters.AC ? css.active : ''}`}
            onClick={() => handleTempFilterChange('AC', !tempFilters.AC)}
          >
            <svg width={32} height={28}>
              <use href="../../../public/svg-sprite.svg#icon-wind" />
            </svg>
            AC
          </button>
          <button
            className={`${css.vehicleBtn} ${
              tempFilters.transmission ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange(
                'transmission',
                tempFilters.transmission === 'automatic' ? '' : 'automatic'
              )
            }
          >
            <svg width={32} height={24}>
              <use href="../../../public/svg-sprite.svg#icon-diagram" />
            </svg>
            Automatic
          </button>
          <button
            className={`${css.vehicleBtn} ${
              tempFilters.kitchen ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange('kitchen', !tempFilters.kitchen)
            }
          >
            <svg width={33} height={30}>
              <use href="../../../public/svg-sprite.svg#icon-cup-hot" />
            </svg>
            Kitchen
          </button>
          <button
            className={`${css.vehicleBtn} ${tempFilters.TV ? css.active : ''}`}
            onClick={() => handleTempFilterChange('TV', !tempFilters.TV)}
          >
            <svg width={32} height={25}>
              <use href="../../../public/svg-sprite.svg#icon-tv" />
            </svg>
            TV
          </button>
          <button
            className={`${css.vehicleBtn} ${
              tempFilters.bathroom ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange('bathroom', !tempFilters.bathroom)
            }
          >
            <svg width={31} height={27}>
              <use href="../../../public/svg-sprite.svg#icon-shower" />
            </svg>
            Bathroom
          </button>
        </div>
      </div>

      <div className={css.vehileWrap}>
        <p className={css.filterSectionHeader}>Vehicle type</p>
        <div className={css.divider}></div>
        <div className={css.vehicleBtnWrap}>
          <button
            className={`${css.vehicleBtn} ${
              tempFilters.form === 'panelTruck' ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'panelTruck' ? '' : 'panelTruck'
              )
            }
          >
            <svg width={32} height={32}>
              <use href="../../../public/svg-sprite.svg#icon-grid-1x2" />
            </svg>
            van
          </button>

          <button
            className={`${css.vehicleBtn} ${
              tempFilters.form === 'fullyIntegrated' ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'fullyIntegrated' ? '' : 'fullyIntegrated'
              )
            }
          >
            <svg width={28} height={28}>
              <use href="../../../public/svg-sprite.svg#icon-grid" />
            </svg>
            fullyIntegrated
          </button>
          <button
            className={`${css.vehicleBtn} ${
              tempFilters.form === 'alcove' ? css.active : ''
            }`}
            onClick={() =>
              handleTempFilterChange(
                'form',
                tempFilters.form === 'alcove' ? '' : 'alcove'
              )
            }
          >
            <svg width={28} height={28}>
              <use href="../../../public/svg-sprite.svg#icon-gap" />
            </svg>
            Alcove
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
