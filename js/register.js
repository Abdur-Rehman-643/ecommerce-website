document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
    
    if (password !== repassword) {
        alert('Passwords do not match');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
        alert('User already exists with this email.');
        return;
    }

    const user = {
        username: username,
        email: email,
        password: password
    };

    users.push(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user)); 
    localStorage.setItem('users', JSON.stringify(users)); 

    alert(`Registration successful! \nWelcome, ${user.username}!`);
    
    window.location.href = './mainscreen.html';
});
