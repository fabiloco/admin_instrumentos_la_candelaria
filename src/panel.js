import { showProductsInDOM } from "./products.js";

window.addEventListener('hashchange', (e) => {
    const hash = window.location.hash.slice(1);
    if(hash === 'products') {
        document.getElementById('panel-categories').classList.remove('flex');
        document.getElementById('panel-categories').classList.add('hidden');

        document.getElementById('panel-products').classList.remove('hidden');
        document.getElementById('panel-products').classList.add('flex');

        showProductsInDOM();
    }else if(hash === 'categories') {
        document.getElementById('panel-products').classList.remove('flex');
        document.getElementById('panel-products').classList.add('hidden');

        document.getElementById('panel-categories').classList.remove('hidden');
        document.getElementById('panel-categories').classList.add('flex');
    };
});