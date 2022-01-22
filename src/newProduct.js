import { auth } from "./auth.js";
import { storeProduct } from "./services.js";

const token = auth();

const domProductName = document.getElementById('product-name');
const domProductPrice = document.getElementById('product-price');
const domProductWeight = document.getElementById('product-weight');
const domProductStock = document.getElementById('product-stock');
const domProductDescription = document.getElementById('product-description');
const domProductThumbnail = document.getElementById('product-thumbnail');
const domProductImages = document.getElementById('product-images');

const domFormEdit = document.getElementById('product-form');

const product = {
    name: '',
    price: '',
    weight: '',
    stock: '',
    description: '',
    thumbnail: '',
    images: '',
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

domProductImages.addEventListener('change', (e) => {
    product.images = e.target.files;
})

domFormEdit.addEventListener('submit', async (e) => {
    e.preventDefault();

    await storeProduct(product, token);
    
    Swal.fire({
        title: 'Exito!',
        text: 'Producto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
});