import { useLocation } from 'react-router-dom';

const Reviews = () => {
  const location = useLocation();
  const { reviews } = location.state || {}; // Отримуємо дані з state

  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul>
      {reviews.map((review, index) => (
        <li key={index}>
          <p>
            {review.reviewer_name} - Rating: {review.reviewer_rating}
          </p>
          <p>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
