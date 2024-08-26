document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('useremail').value;
    const password = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert(`Login successful! \nWelcome, ${user.username}!`);
        localStorage.setItem('loggedInUser', JSON.stringify(user)); 
        window.location.href = './mainscreen.html';
    } else {
        alert('User does not exist or password is incorrect. Please create an account.');
    }
});
