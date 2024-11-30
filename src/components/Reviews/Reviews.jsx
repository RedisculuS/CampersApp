import { useLocation } from 'react-router-dom';
import css from './Reviews.module.css';
import Rating from './Rating';

const Reviews = () => {
  const location = useLocation();
  const { reviews } = location.state || {};

  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <ul className={css.listWrap}>
      {reviews.map((review, index) => (
        <li key={index}>
          <div className={css.reviewHeader}>
            <div className={css.nicknameWrap}>{review.reviewer_name[0]}</div>
            <div className={css.ratingNameWrap}>
              <div>{review.reviewer_name} </div>
              <div>
                <Rating rating={review.reviewer_rating} />
              </div>
            </div>
          </div>

          <p className={css.reviewComment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
