document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registrationForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Validate date of birth (age between 18 and 55)
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        const dayDiff = today.getDate() - dobDate.getDate();
        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert('Date of birth must be for someone between 18 and 55 years old.');
            return;
        }

        // Save data to localStorage
        const user = { name, email, password, dob, terms: terms ? "Yes" : "No" };
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

        // Add row to the table
        addRowToTable(user);

        // Clear the form
        document.getElementById('registrationForm').reset();
    });

    // Load saved data from localStorage on page load
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(addRowToTable);
});

// Function to add a row to the table
function addRowToTable(user) {
    const tableBody = document.querySelector('#userTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms}</td>
    `;
    tableBody.appendChild(row);
}
