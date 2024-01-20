document.addEventListener('DOMContentLoaded', function () {
    showRegistrationForm();
});

function showRegistrationForm() {
    document.getElementById('content').innerHTML = `
        <form id="registrationForm" onsubmit="registerUser(); return false;">
            <label for="name">Name:</label>
            <input type="text" id="name" required>

            <label for="surname">Surname:</label>
            <input type="text" id="surname" required>

            <label for="username">Username:</label>
            <input type="text" id="username" required>

            <label for="password">Password:</label>
            <input type="password" id="password" required>

            <label for="age">Age:</label>
            <input type="number" id="age" required>

            <label for="gender">Sex:</label>
            <select id="gender" required>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label for="status">Status:</label>
            <select id="status" required>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
            </select>

            <p></p>

            <button type="submit">Registrovat</button>
        </form>
    `;
}

function registerUser() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const status = document.getElementById('status').value;

    const user = {
        name,
        surname,
        username,
        password,
        age,
        gender,
        status
    };

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    existingUsers.push(user);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    document.getElementById('registrationForm').reset();
    alert('User successfully registered!');
}

function showUserList() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    let userListHTML = '<h2>Database of users</h2>';
    if (users.length === 0) {
        userListHTML += '<p>No users have been added yet.</p>';
    } else {
        userListHTML += '<ul>';
        users.forEach(user => {
            userListHTML += `<li>${user.username} - ${user.name} ${user.surname} (Status: ${user.status})</li>`;
        });
        userListHTML += '</ul>';
    }

    document.getElementById('content').innerHTML = userListHTML;
}

function showLoginForm() {
    document.getElementById('content').innerHTML = `
        <form id="loginForm" onsubmit="loginUser(); return false;">
            <label for="loginUsername">Username:</label>
            <input type="text" id="loginUsername" required>

            <label for="loginPassword">Password:</label>
            <input type="password" id="loginPassword" required>

            <p></p>

            <button type="submit">Login</button>
        </form>
    `;
}

function loginUser() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find(user => user.username === username);

    if (!foundUser) {
        alert('User not found.');
    } else {
        if (foundUser.password === password) {
            alert('Login successful!');
            window.location.href = 'successlogin.html';
        } else {
            alert('Wrong password. Try it again.');
        }
    }
}

function deleteUser() {
    const usernameToDelete = prompt('Enter the user you want to delete:');
    const passwordToDelete = prompt('Enter your password to verify:');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUserIndex = users.findIndex(user => user.username === usernameToDelete);

    if (foundUserIndex === -1) {
        alert('User not found');
    } else {
        if (users[foundUserIndex].password === passwordToDelete) {
            users.splice(foundUserIndex, 1);
            localStorage.setItem('users', JSON.stringify(users));

            alert('User succesfully deleted');
        } else {
            alert('Wrong password. The user is not deleted.');
        }
    }
}

function deleteDatabase() {
    const confirmDelete = confirm('Are you sure you want to delete the entire user database? This action cannot be undone.');

    if (confirmDelete) {
        localStorage.removeItem('users');

        alert('User database deleted successfully!');
    }
}