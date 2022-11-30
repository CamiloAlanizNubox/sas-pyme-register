const formButton = document.querySelector('#register-form-button');

const emailField = document.querySelector('[name="email"]');
const passwordField = document.querySelector('[name="password"]');
const togglePasswordElement = document.querySelector('#password-visibility-toggle')
const passwordEnableVisibility = document.querySelector('#enable-visibility');
const passwordDisableVisibility = document.querySelector('#disable-visibility');

const noVerifiedWarningElement = document.querySelector('#not-verified-warning');
const recoveryOptionsElement = document.querySelector('#recovery-options');

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
        return 'Ingresa un correo electrónico';
    }

    if (!matchEmailString(email)) {
        return 'Ingresa una dirección de correo electrónico válida (Ej., SuNombre@su-empresa.com)';
    }

    return null;
}

const validatePassword = (input) => {
    const password = getFieldValue(input);

    if (!password) {
        return 'Ingresa una contraseña';
    }

    if (password.length < 8) {
        return 'El largo minimo debe ser de 8 carácteres';
    }

    if (password.length > 25) {
        return 'El largo maximo debe ser de 25 carácteres';
    }

    return null;
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

const checkEmailAvailability = async (email) => {
    return postData('https://api.test-nubox.com/bffauthregister-develop/mailExists', { email: email});
}

const showNotVerifiedWarning = () => {
    noVerifiedWarningElement.classList.remove('none');
}

const hiddeNotVerifiedWarning = () => {
    noVerifiedWarningElement.classList.add('none');
}

const showRecoveryOptions = () => {
    recoveryOptionsElement.classList.remove('none');
}

const hiddeRecoveryOptions = () => {
    recoveryOptionsElement.classList.add('none');
}

const handleEmailInput = () => {
    const error = validateEmail(emailField);

    if (error) {
        hiddeNotVerifiedWarning();
        hiddeRecoveryOptions();
        setError(emailField, error);
        return;
    }
    checkEmailAvailability(emailField.value).then( response => {
        hiddeNotVerifiedWarning();
        hiddeRecoveryOptions();
        if (
            response.mailExists?.registered &&
            !response.mailExists?.registration[0].verified
        ) {
            setError(emailField, '');
            showNotVerifiedWarning();
        } else if (
            response.mailExists?.registered &&
            response.mailExists?.registration[0].verified
        ) {
            setError( emailField,'Ya estás registrado en el sistema');
            showRecoveryOptions();
        } else {
            cleanError(emailField);
        }
    } ).catch( () => {
        cleanError(emailField);
    } );

};
const handlePasswordInput = () => {
    const error = validatePassword(passwordField);

    if (error) {
        setError(passwordField, error);
        return;
    }

    cleanError(passwordField);
};




const validateForm = () => {
    console.log('is valid?');
}

const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

const registerRequest = (body) => {
    postData('https://api.test-nubox.com/bffauthregister-develop/register', body)
        .then((response => {
            console.log(response);
            console.log(body);
            alert("Registrando");
            processRegister(response, body.email);
        }))
        .catch(error => {
            console.log('error', error.message);
            alert("Error");
        });
}

const handleSubmit = (event) => {
    event.preventDefault()
    validateForm();
    const email = getFieldValue(emailField);
    const password = getFieldValue(passwordField);
    const body = {
        email,
        password,
        fullName: 'SIN_NOMBRE'
    };
    registerRequest(body);
}


togglePasswordElement.addEventListener('click', handlePasswordVisibilityToggle );

emailField.addEventListener('change', () => addInputDelay(handleEmailInput));
passwordField.addEventListener('change', () => addInputDelay(handlePasswordInput));

formButton.addEventListener('click', handleSubmit);
