
const form = document.getElementById('form');
const name = document.getElementById('name');
const firstname = document.getElementById('firstname');
const email = document.getElementById('email');

const validateForm = () => {
let noError = true;
const nameValue = name.value.trim();
const firstnameValue = firstname.value.trim();
const emailValue = email.value.trim();



const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const setError = (element,message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.errorMessage');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

if (nameValue === ''){
    setError(name, 'Entrer votre nom');
    noError = false;
} else {
    setSuccess(name);
}

if (firstnameValue === ''){
    setError(firstname, 'Entrer votre prénom');
    noError = false;
} else {
    setSuccess(firstname);
}

if (emailValue === ''){
    setError(email, 'Entrer votre courriel');
    noError = false;
} else if (!isValidEmail(emailValue)) {
    setError(email,'Entrer une adresse courriel valide');
    noError = false;
} else {
    setSuccess(email);
}

return noError;

}
