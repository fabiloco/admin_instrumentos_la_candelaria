export const auth = () => {
    const token = window.sessionStorage.getItem('userToken');

    if(token) return token;
    else window.location.href = '/index';
};