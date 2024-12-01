import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import css from './BookingForm.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enUS } from 'date-fns/locale';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bookingDate: '',
    comment: '',
  });

  const [bookingDate, setBookingDate] = useState(null);
  const [error, setError] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = date => {
    const normalizedDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (normalizedDate < today) {
      setError(true);
      setBookingDate(null);
    } else {
      setError(false);
      setBookingDate(normalizedDate);
      setFormData(prevData => ({
        ...prevData,
        bookingDate: normalizedDate.toISOString().split('T')[0],
      }));
      setIsCalendarOpen(false);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(prev => !prev);
  };

  const handleSubmit = e => {
    e.preventDefault();
    toast.success('Booking confirmed successfully!');
    setFormData({
      name: '',
      email: '',
      bookingDate: '',
      comment: '',
    });
    setBookingDate(null);
  };

  return (
    <div className={css.wrapper}>
      <form className={css.form} onSubmit={handleSubmit}>
        <h2>Book your campervan now</h2>
        <p className={css.formSecondaryText}>
          Stay connected! We are always ready to help you.
        </p>

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
        <div className={css.datePickerWrapper}>
          <input
            type="text"
            name="bookingDate"
            placeholder={error ? 'Select a date between today' : 'Booking date'}
            value={formData.bookingDate}
            readOnly
            onClick={toggleCalendar}
            className={css.datePicker}
          />
          {isCalendarOpen && (
            <div className={css.calendarWrapper}>
              <Calendar
                next2Label={null}
                prev2Label={null}
                onChange={handleDateChange}
                value={bookingDate}
                className={css.calendar}
                locale={enUS}
              />
            </div>
          )}
        </div>

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
      <ToastContainer position="top-center" />
    </div>
  );
};

export default BookingForm;
