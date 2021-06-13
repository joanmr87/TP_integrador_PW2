// Variables
const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const registerBox = document.querySelector('.register-box');
const loginBox = document.querySelector('.login-box');
const register = document.querySelector('#register');
const login = document.querySelector('#login');

// Listeners
loginForm.addEventListener('submit', submitLoginForm);
registerForm.addEventListener('submit', submitRegisterForm);
register.addEventListener('click', toggleForm);
login.addEventListener('click', toggleForm);

function toggleForm(e) {
    e.preventDefault();
    loginBox.classList.toggle('d-none');
    registerBox.classList.toggle('d-none');

}

async function submitRegisterForm(e) {
    console.log("Register form")
    e.preventDefault();
    // Leo campos del form
    const user = this.querySelector("#create-user").value;
    const email = this.querySelector("#create-email").value;
    const password = this.querySelector("#create-password").value;
    const confirmPassword = this.querySelector("#confirm-password").value;
    console.log({ user, email, password });

    const resultado = await callApi("POST", '/usuarios', JSON.stringify({ user, email, password }), { 'Content-Type': 'application/json' });
}

function submitLoginForm(e) {
    e.preventDefault();

    // Leo campos del form
    const user = this.querySelector("[type='email']").value;
    const pass = this.querySelector("[type='password']").value;

    // Primer validacion
    if (user && pass) {
        const userData = { user, pass }


    } else {
        console.log("Faltan datos");
    }
}