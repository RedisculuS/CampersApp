import { useState } from 'react';
import css from './BookingForm.module.css'; // Стилі для форми
import DatePicker from 'react-datepicker';
// import { newDate } from 'react-datepicker/dist/date_utils';
// import { addDays } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  //   const [bookingDate, setBookingDate] = useState(null);

  //   const handleDateChange = date => {
  //     setBookingDate(date);
  //   };

  const [bookingDate, setBookingDate] = useState(null);
  const [error, setError] = useState('');

  const handleDateChange = date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Залишаємо тільки дату

    if (date < today) {
      setError(true);
      setBookingDate(null);
    } else {
      setError(false);
      setBookingDate(date);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Submitted data:', formData);
    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>

        <input
          type="text"
          name="name"
          placeholder="Name*"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* <input
          type="text"
          name="bookingDate"
          placeholder="Booking date*"
          value={formData.bookingDate}
          onChange={handleChange}
          required
        /> */}
        <DatePicker
          selected={bookingDate}
          onChange={handleDateChange}
          className={`${css.datePicker} ${error ? 'error' : ''}`}
          calendarClassName={css.customCalendar}
          placeholderText={
            error ? 'Select a day between today' : 'Booking date'
          }
          showPopperArrow={true}
        />

        <textarea
          name="comment"
          placeholder="Comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <button type="submit" className={css.submitButton}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
