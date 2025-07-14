import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

if (form) {
  form.addEventListener('submit', handleSubmit);
  console.log('✅ Форма знайдена, обробник додано');
} else {
  console.error('❌ Форма не знайдена! Перевір class="form" у HTML');
}

function handleSubmit(event) {
  event.preventDefault();

  const { delay, state } = event.target.elements;
  const delayValue = Number(delay.value);
  const stateValue = state.value;

  console.log('📨 Сабміт форми відбувся');
  console.log('⏱ Затримка:', delayValue);
  console.log('📦 Статус:', stateValue);

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateValue === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  })
    .then((delay) => {
      console.log('✅ Проміс виконано');
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch((delay) => {
      console.log('❌ Проміс відхилено');
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
      });
    });
}
