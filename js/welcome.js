const userName = localStorage.getItem('userName');
const userEmail = localStorage.getItem('userEmail');

if (userName && userEmail) {
    document.getElementById('user-name').textContent = userName;
    document.getElementById('user-email').textContent = userEmail;
} else {
    window.location.href = '/sign-up';
}
