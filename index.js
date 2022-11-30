const formButton = document.querySelector('#register-form-button');

const emailField = document.querySelector('[name="email"]');
const passwordField = document.querySelector('[name="password"]');
const togglePasswordElement = document.querySelector('#password-visibility-toggle')
const passwordEnableVisibility = document.querySelector('#enable-visibility');
const passwordDisableVisibility = document.querySelector('#disable-visibility');

const getFieldValue = (input) => input.value;

const setError = (input, message) => {
    const formControl = input.parentElement;

    const small = formControl.querySelector("small");

    input.classList.add('form-input-error');

    small.classList.add("error-text");
    small.classList.remove("hidde");

    small.textContent = message;
}

const cleanError = (input) => {
    const formControl = input.parentElement;

    const small = formControl.querySelector("small");
    input.classList.remove('form-input-error');

    small.classList.remove("error-text");
    small.classList.add("hidde");

    small.textContent = null;
}

const matchEmailString = (text) => String(text)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const validateEmail = (input) => {
    const email = getFieldValue(input);

    if (!email) {
        setError(input, 'Ingresa un correo electrónico');
        return;
    }

    if (!matchEmailString(email)) {
        setError(input, 'Ingresa una dirección de correo electrónico válida (Ej., SuNombre@su-empresa.com)');
        return;
    }

    cleanError(input);
}

const validatePassword = (input) => {
    const password = getFieldValue(input);

    if (!password) {
        setError(input, 'Ingresa una contraseña');
        return;
    }

    if (password.length < 8) {
        setError(input, 'El largo minimo debe ser de 8 carácteres');
        return;
    }

    if (password.length > 25) {
        setError(input, 'El largo maximo debe ser de 25 carácteres');
        return;
    }

    cleanError(input);
}

const addInputDelay = (callback) => setTimeout(() => callback(), 500);

const handlePasswordVisibilityToggle = () => {
    if (passwordEnableVisibility.classList.contains('none')) {
        passwordEnableVisibility.classList.remove('none');
        passwordDisableVisibility.classList.add('none');
        passwordField.type = "password";
    } else {
        passwordDisableVisibility.classList.remove('none');
        passwordEnableVisibility.classList.add('none');
        passwordField.type = "text";
    }
}

const handleEmailInput = () => {
    addInputDelay(() => validateEmail(emailField));

};
const handlePasswordInput = () => addInputDelay(() => validatePassword(passwordField));




const validateForm = () => {
    console.log('is valid?');
}

const handleSubmit = (event) => {
    event.preventDefault()
    validateForm();
}
togglePasswordElement.addEventListener('click', handlePasswordVisibilityToggle );

emailField.addEventListener('change', handleEmailInput);
passwordField.addEventListener('change', handlePasswordInput);

formButton.addEventListener('click', handleSubmit);
