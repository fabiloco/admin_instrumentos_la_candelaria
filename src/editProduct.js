import { auth } from "./auth.js";
import { getProduct, updateProduct } from "./services.js";

const id = window.location.hash.slice(1);

const token = auth();

const domProductName = document.getElementById('product-name');
const domProductPrice = document.getElementById('product-price');
const domProductWeight = document.getElementById('product-weight');
const domProductStock = document.getElementById('product-stock');
const domProductDescription = document.getElementById('product-description');
const domProductThumbnail = document.getElementById('product-thumbnail');

const domFormEdit = document.getElementById('product-form');

const product = {
    name: '',
    price: '',
    weight: '',
    stock: '',
    description: '',
    thumbnail: '',
};

domProductName.addEventListener('keyup', (e) => {
    product.name = e.target.value;
});

domProductPrice.addEventListener('keyup', (e) => {
    product.price = e.target.value;
});

domProductWeight.addEventListener('keyup', (e) => {
    product.weight = e.target.value;
});

domProductStock.addEventListener('keyup', (e) => {
    product.stock = e.target.value;
});

domProductDescription.addEventListener('keyup', (e) => {
    product.description = e.target.value;
});

domProductThumbnail.addEventListener('change', (e) => {
    product.thumbnail = e.target.files[0];
});

domFormEdit.addEventListener('submit', async (e) => {
    e.preventDefault();

    await updateProduct(id, product, token);
})

const setProductData = async () => {
    const data = await getProduct(id);

    domProductName.value = data.name;
    domProductDescription.value = data.description;
    domProductPrice.value = data.price;
    domProductStock.value = data.stock;
    domProductWeight.value = data.weight;
    // domProductThumbnail.value = new File(data.thumbnail);
};

(() => { setProductData() })();