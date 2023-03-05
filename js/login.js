
var element = document.querySelector('#log-in');
element.addEventListener("submit", function (event) {
    event.preventDefault()
    const formData = new FormData(element);
    const email = formData.get('email');
    const password = formData.get('password');
    fetch("/log-in", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((data) => data.json()).then((data) => {
        if (data?.status == 200) {
            window.location.href = '/';
            return
        } else {
            const emailErr = document.getElementById('email-error');
            emailErr.textContent = data?.email;
            const passError = document.getElementById('password-error');
            passError.textContent = data?.password;
            return
        }
    }).catch((error) => {
    })
})
