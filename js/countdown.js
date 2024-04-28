document.getElementById('ageLimit').value = AGE_LIMIT;

document.querySelector('h1 small').textContent = `(AGE limit considering ${AGE_LIMIT} years)`;

document.getElementById('ageLimit').addEventListener('input', function (event) {
  document.querySelector('h1 small').textContent = `(AGE limit considering ${event.target.value} years)`;
});

document.getElementById('birthdayForm').addEventListener('submit', function (event) {
  event.preventDefault();
  AGE_LIMIT = parseInt(document.getElementById('ageLimit').value);

  if (countdownInterval) {
    clearInterval(countdownInterval);
  }
