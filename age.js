document.getElementById('age-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const day = parseInt(document.getElementById('date').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const errorMessage = document.getElementById('error-message');
    const currentDate = new Date();

    errorMessage.textContent = ''; // Clear previous error messages

    // Validate the inputs
    if (!day || !month || !year) {
        errorMessage.textContent = 'All fields are required.';
        return;
    }
    if (day < 1 || day > 31) {
        errorMessage.textContent = 'Day must be between 1 and 31.';
        return;
    }
    if (month < 1 || month > 12) {
        errorMessage.textContent = 'Month must be between 1 and 12.';
        return;
    }
    if (new Date(year, month - 1, day) > currentDate) {
        errorMessage.textContent = 'Date cannot be in the future.';
        return;
    }

    // Check for invalid dates like 31/04
    const isValidDate = (new Date(year, month - 1, day).getDate() === day);
    if (!isValidDate) {
        errorMessage.textContent = 'Invalid date.';
        return;
    }

    // Calculate the age
    const birthDate = new Date(year, month - 1, day);
    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    // Adjust the day if negative (borrow days from the previous month)
    if (ageDays < 0) {
        ageMonths--;
        const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        ageDays += daysInPreviousMonth; // Add to make up for negative days
    }

    // Adjust the months if negative (borrow months from the previous year)
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    // Animate and display results
    animateValue('years', 0, ageYears, 2000);
    animateValue('months', 0, ageMonths, 2000);
    animateValue('days', 0, ageDays, 2000);
});

// Function to animate the age values
function animateValue(id, start, end, duration) {
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));

    let obj = document.getElementById(id);
    obj.style.color = '#af0699'; // Set the color here

    let timer = setInterval(function() {
        current += increment;
        obj.textContent = current;
        if (current === end) {
            clearInterval(timer);
        }
    }, stepTime);
}

