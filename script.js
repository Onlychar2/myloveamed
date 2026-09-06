/* =========================================================
   CONTADOR DE NUESTRO TIEMPO JUNTOS
========================================================= */

const relationshipStart = new Date(
  '2025-09-06T00:00:00'
);

let counterStarted = false;

function updateLoveCounter() {

  const now = new Date();

  let difference =
    now.getTime() -
    relationshipStart.getTime();

  if (difference < 0) {
    difference = 0;
  }

  const totalSeconds =
    Math.floor(difference / 1000);

  const days =
    Math.floor(
      totalSeconds / 86400
    );

  const hours =
    Math.floor(
      (totalSeconds % 86400) / 3600
    );

  const minutes =
    Math.floor(
      (totalSeconds % 3600) / 60
    );

  const seconds =
    totalSeconds % 60;


  const daysElement =
    document.getElementById(
      'counter-days'
    );

  const hoursElement =
    document.getElementById(
      'counter-hours'
    );

  const minutesElement =
    document.getElementById(
      'counter-minutes'
    );

  const secondsElement =
    document.getElementById(
      'counter-seconds'
    );


  if (daysElement)
    daysElement.textContent = days;

  if (hoursElement)
    hoursElement.textContent =
      String(hours).padStart(2, '0');

  if (minutesElement)
    minutesElement.textContent =
      String(minutes).padStart(2, '0');

  if (secondsElement)
    secondsElement.textContent =
      String(seconds).padStart(2, '0');
}


function showLoveCounter() {

  const counter =
    document.getElementById(
      'love-counter'
    );

  if (!counter) return;


  counter.style.display =
    'block';

  counter.style.opacity =
    '0';

  counter.style.transform =
    'translateY(30px) scale(.95)';


  counter.animate(
    [
      {
        opacity: 0,
        transform:
          'translateY(30px) scale(.95)'
      },

      {
        opacity: 1,
        transform:
          'translateY(0) scale(1)'
      }
    ],
    {
      duration: 1000,
      easing:
        'cubic-bezier(.16,1,.3,1)',
      fill: 'forwards'
    }
  );


  updateLoveCounter();


  if (!counterStarted) {

    counterStarted = true;

    setInterval(
      updateLoveCounter,
      1000
    );

  }
}
