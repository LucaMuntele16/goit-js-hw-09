
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}


document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const delayInput = parseInt(event.target.delay.value);
  const stepInput = parseInt(event.target.step.value);
  const amountInput = parseInt(event.target.amount.value);

  let delay = delayInput;


  for (let i = 1; i <= amountInput; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    
  
    delay += stepInput;
  }
});
