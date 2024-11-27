import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectError,
  selectLoading,
  selectSelectedCamper,
} from '../../redux/selectors';
import { fetchCamperById } from '../../redux/campersSlice';

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

  return (
    <div>
      <h1>{selectedCamper.name}</h1>
      <p>Price: ${selectedCamper.price}</p>
      <p>Rating: {selectedCamper.rating}</p>
      <p>Description: {selectedCamper.description}</p>
      <h2>Gallery</h2>
      <div style={{ display: 'flex' }}>
        {selectedCamper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`${selectedCamper.name} - ${index + 1}`}
            style={{
              width: '300px',
              height: 'auto',
              borderRadius: '8px',
              marginRight: '10px',
            }}
          />
        ))}
      </div>
      <h2>Details</h2>
      <ul>
        <li>Form: {selectedCamper.form}</li>
        <li>Length: {selectedCamper.length}</li>
        <li>Width: {selectedCamper.width}</li>
        <li>Height: {selectedCamper.tank}</li>
        <li>Consumption: {selectedCamper.consumption}</li>
      </ul>

      <h2>Features</h2>
      <ul>
        {selectedCamper.transmission && (
          <li>Transmission: {selectedCamper.transmission}</li>
        )}
        {selectedCamper.engine && <li>Engine: {selectedCamper.engine}</li>}
        {selectedCamper.AC && <li>Air Conditioning</li>}
        {selectedCamper.bathroom && <li>Bathroom</li>}
        {selectedCamper.kitchen && <li>Kitchen</li>}
        {selectedCamper.TV && <li>TV</li>}
        {selectedCamper.radio && <li>Radio</li>}
        {selectedCamper.refrigerator && <li>Refrigerator</li>}
        {selectedCamper.microwave && <li>Microwave</li>}
        {selectedCamper.gas && <li>Gas</li>}
        {selectedCamper.water && <li>Water Supply</li>}
      </ul>
      <h3>Reviews</h3>
      {selectedCamper.reviews && selectedCamper.reviews.length > 0 ? (
        <ul>
          {selectedCamper.reviews.map((review, index) => (
            <li key={index}>
              <p>
                {review.reviewer_name} - Rating: {review.reviewer_rating}
              </p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
      <h2>Booking Form</h2>
      <form>
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
  );
};

export default CamperDetailsPage;
