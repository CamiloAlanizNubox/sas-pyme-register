const formButton = document.querySelector('#register-form-button');

const emailField = document.querySelector('#email');
const phoneField = document.querySelector('#phone');
const passwordField = document.querySelector('#password');

const validateForm = () => {
    console.log('validating');
}

const handleSubmit = (event) => {
    console.log('submitting');
    event.preventDefault()
    validateForm();
}

formButton.addEventListener('click', handleSubmit);