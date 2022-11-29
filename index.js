const formButton = document.querySelector('#register-form-button');

const emailField = document.querySelector('[name="email"]');
const phoneField = document.querySelector('[name="phone"]');
const passwordField = document.querySelector('[name="password"]');

const getFieldValue = (input) => input.value;


const validateEmail = (input) => {
    console.log('validating email', input);
    let isValid = true;
    const email = getFieldValue(input);
    console.log('email value', email);

    isValid = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    console.log('validated', isValid);
}

const validatePhone = (input) => {
    const phone = getFieldValue(input);
    console.log('phone value', phone);
}

const validatePassword = (input) => {
    const password = getFieldValue(input);
    console.log('password value', password);
}

const addInputDelay = (callback) => setTimeout(() => callback(), 500);

const handleEmailInput = () => addInputDelay(() => validateEmail(emailField));
const handlePhoneInput = () => addInputDelay(() => validatePhone(phoneField));
const handlePasswordInput = () => addInputDelay(() => validatePassword(passwordField));




const validateForm = () => {
    console.log('is valid?');
}

const handleSubmit = (event) => {
    event.preventDefault()
    validateForm();
}

emailField.addEventListener('change', handleEmailInput);
phoneField.addEventListener('change', handlePhoneInput);
passwordField.addEventListener('change', handlePasswordInput);

formButton.addEventListener('click', handleSubmit);
