const buttonStart = document.querySelector(".start");
const buttonStop = document.querySelector(".stop");
buttonStop.disabled=true;
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
// var fct = setInterval(getRandomHexColor,1000);

// const handleClick = () => {
//   document.body.style.background = setInterval(() => {
//     getRandomHexColor
//   }, 1000);
// };


buttonStart.addEventListener("click", () =>{
 timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor()
    buttonStart.disabled = true;
    buttonStop.disabled = false;
  }, 1000);
});

buttonStop.addEventListener("click", () =>{
  clearInterval(timerId);
  buttonStart.disabled = false;
    buttonStop.disabled = true;
})

