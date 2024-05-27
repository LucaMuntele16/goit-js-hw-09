// Descris în documentație
import flatpickr from "flatpickr";
// Import suplimentar de stil
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.getElementById('datetime-picker');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    console.log(selectedDate);
    if (selectedDate <= new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker,options);

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

startButton.addEventListener('click', () => {
  if (selectedDate > new Date()) {
    startCountdown(selectedDate);
  }
});

function startCountdown(endDate){
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = endDate - now;

    if(timeRemaining <=0){
      clearInterval(countdownInterval);
      updateTimerDisplay(0,0,0,0);
    } else {
      const {days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateTimerDisplay(days,hours,minutes,seconds);
    }
  },1000);
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  daysSpan.textContent = addLeadingZero(days);
  hoursSpan.textContent = addLeadingZero(hours);
  minutesSpan.textContent = addLeadingZero(minutes);
  secondsSpan.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value){
    return String(value).padStart(2,'0');
}


