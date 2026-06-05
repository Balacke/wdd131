// retrieve form from DOM, print result
const form = document.getElementById("fsyForm");
console.log(form);


const campusBoxes = document.querySelectorAll("input[name='campus']");

// Return an array of selected campus values
function getSelectedCampuses() {
    return Array.from(campusBoxes)
        .filter(box => box.checked)
        .map(box => box.value);
}

// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // prevents timezone issues
    const chosen = new Date(value);
    return chosen < today;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    const numberOfCampuses = form.travelRange.value;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const type = form.travelRange.value;
    const availableDate = form.availableDate.value;
    const selectedCampuses = getSelectedCampuses();
    const note = form.notes.value.trim();

    const output = document.getElementById("output");

    // --- Campus validation ---
    if (numberOfCampuses === "one" && selectedCampuses.length === 0) {
        output.textContent = "Please Select One Campus, ye scally-wag";
        return;
    }

    if (numberOfCampuses === "one" && selectedCampuses.length >= 2)  {
        output.textContent = "Please Select One Campus, ye scally-wag";
        return;
    }

    if (numberOfCampuses === "many" && selectedCampuses.length <= 1) {
        output.textContent = "Please Select Two or more Campuses, ye scally-wag";
        return;
    }

    // --- Date validation ---
    if (isPastDate(availableDate)) {
        output.textContent = "Please enter a future date";
        return;
    }

    output.innerHTML = `
        <h2>Preference Submitted</h2>
        <p>${firstName} ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Availability: ${availableDate}</p>
        <p>Campuses: ${selectedCampuses.join(", ")}</p>
        <p>Preference Level: ${type}</p>
        `;

    form.reset();
    updateNotesField();
    output.textContent = "Form submitted successfully!";
});
