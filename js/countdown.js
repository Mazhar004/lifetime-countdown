var countdownInterval;

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

  var birthdate = new Date(document.getElementById('birthdate').value);
  var countdownElement = document.getElementById('countdown');

  if (isNaN(birthdate.getTime())) {
    countdownElement.textContent = 'Please enter a valid birthdate';
    return;
  }

  var now = new Date();
  var timePassed = now.getTime() - birthdate.getTime();
  var yearsPassed = Math.floor(timePassed / (1000 * 60 * 60 * 24 * 365));
  var monthsPassed = Math.floor((timePassed % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
  var daysPassed = Math.floor((timePassed % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
  var hoursPassed = Math.floor((timePassed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutesPassed = Math.floor((timePassed % (1000 * 60 * 60)) / (1000 * 60));
  var secondsPassed = Math.floor((timePassed % (1000 * 60)) / 1000);

  var futureDate = new Date(birthdate);
  futureDate.setFullYear(futureDate.getFullYear() + AGE_LIMIT);

  countdownInterval = setInterval(updateCountdown, 1000);

  function progressYears(passed) {
    var passedYears = passed / (60 * 60 * 24 * 365);
    var progress = (passedYears / AGE_LIMIT) * 100;

    return `
          <tr>
            <td colspan="3">
              <div class="progress" style="height: 30px;">
            <div class="progress-bar bg-primary passed-progress-bar-border" role="progressbar" style="width: ${progress}%; line-height: 30px;" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"><strong>Passed ${progress.toFixed(2)}%</strong></div>
            <div class="progress-bar custom-progress-bar left-progress-bar-border" role="progressbar" style="width: ${100 - progress}%; line-height: 30px;" aria-valuenow="${100 - progress}" aria-valuemin="0" aria-valuemax="100"><strong>Left ${(100 - progress).toFixed(2)}%</strong></div>
              </div>
            </td>
          </tr>
        `;
  }

  function convertTimeToYearsMonthsDaysHoursMinutesSeconds(time, flag = false) {
    var years = Math.floor(time / (365 * 24 * 60 * 60));
    var months = Math.floor((time % (365 * 24 * 60 * 60)) / (30.44 * 24 * 60 * 60));
    var days = Math.floor((time % (30.44 * 24 * 60 * 60)) / (24 * 60 * 60));
    var hours = Math.floor((time % (24 * 60 * 60)) / (60 * 60));
    var minutes = Math.floor((time % (60 * 60)) / 60);
    var seconds = Math.floor(time % 60);

    var result = "";
    if (years > 0) {
      result += `<span class="badge badge-primary">${years} Years</span> `;
    }
    if (months > 0) {
      result += `<span class="badge badge-info">${months} Months</span> `;
    }
    if (days > 0) {
      result += `<span class="badge badge-danger">${days} Days</span> `;
    }
    if (flag) {
      result += `<span class="badge badge-secondary">${hours} Hours</span> `;
      result += `<span class="badge badge-success">${minutes} Minutes</span> `;
      result += `<span class="badge badge-warning">${seconds} Seconds</span>`;
    }
    return result.trim();
