
var element = document.querySelector('#sign-up');
element.addEventListener("submit", function (event) {
    event.preventDefault()
    const formData = new FormData(element);
    const fName = formData.get('fName');
    const lName = formData.get('lName');
    const email = formData.get('email');
    const password = formData.get('password');
    fetch("/sign-up", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fName,
            lName,
            email,
            password
        })
    }).then((data) => data.json()).then((data) => {
        if (data?.status == 200) {
            localStorage.setItem('userName', `${fName} ${lName}`);
            localStorage.setItem('userEmail', email)
            window.location.href = '/welcome';
            return
        } else {
            const fNameErr = document.getElementById('fName-error');
            fNameErr.textContent = data?.fName;
            const lNameErr = document.getElementById('lName-error');
            lNameErr.textContent = data?.lName;
            const emailErr = document.getElementById('email-error');
            emailErr.textContent = data?.email;
            const passError = document.getElementById('password-error');
            passError.textContent = data?.password;
            return
        }
    }).catch((error) => {
    })
})
