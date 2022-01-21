const domUser = document.getElementById('user');
const domPassword = document.getElementById('password');

const domForm = document.getElementById('form');

let user = {
    user: '',
    password: '',
};

domUser.addEventListener('keyup', (e) => {
    user.user = e.target.value;
});

domPassword.addEventListener('keyup', (e) => {
    user.password = e.target.value;
});

domForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('heki');
})

const sendLogin = (e) => {
};