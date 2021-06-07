// Variables
const loginForm = document.querySelector('#login-form');

// Listeners
loginForm.addEventListener('submit', submitLoginForm);

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