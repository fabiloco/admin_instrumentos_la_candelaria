import { login } from "./services.js";

const token = window.sessionStorage.getItem('userToken');
if(token) window.location.href = '/panel';

const domUser = document.getElementById('user');
const domPassword = document.getElementById('password');

const domForm = document.getElementById('form');

let user = {
    name: '',
    password: '',
};

domUser.addEventListener('keyup', (e) => {
    user.name = e.target.value;
});

domPassword.addEventListener('keyup', (e) => {
    user.password = e.target.value;
});

domForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendLogin();
})

const sendLogin = async () => {
    const token = await login(user);
    window.sessionStorage.setItem('userToken', token)
    window.location.href = '/panel'
};