import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const response = await fetch(
          `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
        );
        const data = await response.json();
        setCamper(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching camper details:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !camper) {
    return <p>Error loading camper details. Please try again later.</p>;
  }

  return (
    <div>
      <h1>{camper.name}</h1>
      <p>{camper.description}</p>
      <h2>Gallery</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {camper.gallery.map((image, index) => (
          <img
            key={index}
            src={image.original}
            alt={`Image ${index + 1}`}
            style={{
              width: '200px',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover',
            }}
          />
        ))}
      </div>

      <h2>Details</h2>
      <ul>
        <li>Form: {camper.form}</li>
        <li>Length: {camper.length}</li>
        <li>Width: {camper.width}</li>
        <li>Height: {camper.height}</li>
        <li>Tank Capacity: {camper.tank}</li>
        <li>Consumption: {camper.consumption}</li>
      </ul>

      <h2>Features</h2>
      <ul>
        {camper.transmission && <li>Transmission: {camper.transmission}</li>}
        {camper.engine && <li>Engine: {camper.engine}</li>}
        {camper.AC && <li>Air Conditioning</li>}
        {camper.bathroom && <li>Bathroom</li>}
        {camper.kitchen && <li>Kitchen</li>}
        {camper.TV && <li>TV</li>}
        {camper.radio && <li>Radio</li>}
        {camper.refrigerator && <li>Refrigerator</li>}
        {camper.microwave && <li>Microwave</li>}
        {camper.gas && <li>Gas</li>}
        {camper.water && <li>Water Supply</li>}
      </ul>

      <h2>Reviews</h2>
      {camper.reviews?.length > 0 ? (
        <ul>
          {camper.reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.reviewer_name}</strong> ({review.reviewer_rating}
              /5):
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
