// retrieve form from DOM
const form = document.getElementById("eventForm");

const studentField = document.getElementById("studentId").parentElement;
const accessField = document.getElementById("accessCode").parentElement;

const output = document.getElementById("output");

// Hide both on load
studentField.hidden = true;
accessField.hidden = true;

// Show/hide when attendee changes
form.attendee.addEventListener("change", () => {
    const attendee = form.attendee.value;

    studentField.hidden = true;
    accessField.hidden = true;

    if (attendee === "student") studentField.hidden = false;
    if (attendee === "guest") accessField.hidden = false;
});

// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosen = new Date(value);
    return chosen < today;
}

form.addEventListener("submit", event => {
    event.preventDefault();

    // Read values NOW — not at page load
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const availableDate = form.availableDate.value;
    const attendee = form.attendee.value;
    const studentId = form.studentId.value;
    const accessCode = form.accessCode.value;

    // Reset visibility
    studentField.hidden = true;
    accessField.hidden = true;

    // Student validation
    if (attendee === "student") {
        studentField.hidden = false;

        if (studentId.length !== 9) {
            output.innerHTML = `<p>The Student I# should be 9 digits.</p>`;
            return;
        }
    }

    // Guest logic
    if (attendee === "guest") {
        accessField.hidden = false;

        if (accessCode !== "EVENT131") {
            output.innerHTML = '<p>That is the incorrect access code </p>'
            return;
        }
       
    }

    // Date validation
    if (isPastDate(availableDate)) {
        output.textContent = "Please enter a future date";
        return;
    }

    output.innerHTML = `
        <h2>Ticket Created</h2>
        <p>${firstName} ${lastName}</p>
        <p>Availability: ${availableDate}</p>
        <p>Type: ${attendee}</p>
    `;

    form.reset();
});
