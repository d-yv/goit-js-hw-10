import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');
button.setAttribute('disabled', '');
let userSelectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const dateNow = new Date();
    let dateVerify = selectedDates[0];
    if (dateVerify > dateNow) {
      userSelectedDate = dateVerify;
      button.removeAttribute('disabled');
      console.log('userSelectedDate = ', userSelectedDate);
      console.log('differenceDate = ', convertMs(userSelectedDate - dateNow));
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: 'red',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

button.addEventListener('click', timer);

function timer() {
  button.setAttribute('disabled', '');
  const intervalId = setInterval(() => {
    const now = new Date();
    const difference = userSelectedDate - now;

    if (difference <= 0) {
      clearInterval(intervalId);
    } else {
      const time = convertMs(difference);
      console.log(time); //{days: 1, hours: 23, minutes: 59, seconds: 23}
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
