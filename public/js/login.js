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
	const usuario = this.querySelector("#create-user").value;
	const email = this.querySelector("#create-email").value;
	const password = this.querySelector("#create-password").value;
	const confirmPassword = this.querySelector("#confirm-password").value;

	if (password !== confirmPassword) {
		Swal.fire({
			icon: 'error',
			title: 'Error',
			text: 'Las contraseñas ingresadas deben ser iguales'
		})
		return;
	}

	const resultado = await callApi("POST", '/usuarios', { 'Content-Type': 'application/json' }, JSON.stringify({ usuario, password, email }));

	console.log(resultado);

	if (resultado.token) {
		sessionStorage.setItem('jwt', resultado.token);
	}
}

async function submitLoginForm(e) {
	e.preventDefault();

	// Leo campos del form
	const email = this.querySelector("[type='email']").value;
	const password = this.querySelector("[type='password']").value;

	// Primer validacion
	if (email && password) {
		const response = await callApi("POST", '/auth', { 'Content-Type': 'application/json' }, JSON.stringify({ password, email }));

		if (response.token) {
			sessionStorage.setItem('jwt', response.token);
			window.location = '/index.html';
		} else {
			console.log("error en login")
		}

	} else {
		console.log("Faltan datos");
	}
}