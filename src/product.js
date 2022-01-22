import { auth } from "./auth.js";
import { STORAGE_URL } from "./config/config.js";
import { getProduct, updateProduct } from "./services.js";

const id = window.location.hash.slice(1);

const token = auth();

const domProductName = document.getElementById('product-name');
const domProductPrice = document.getElementById('product-price');
const domProductWeight = document.getElementById('product-weight');
const domProductStock = document.getElementById('product-stock');
const domProductDescription = document.getElementById('product-description');
const domProductThumbnail = document.getElementById('product-thumbnail');
const domProductImages = document.getElementById('product-images');


const setProductData = async () => {
    const data = await getProduct(id);

    domProductName.textContent = data.name;
    domProductDescription.textContent = data.description;
    domProductPrice.textContent = data.price;
    domProductStock.textContent = data.stock;
    domProductWeight.textContent = data.weight;

    const thumbnail =  document.createElement('img');

    thumbnail.src = `${STORAGE_URL}/${data.thumbnail}`;
    thumbnail.alt = data.name;
    thumbnail.classList = 'w-32 h-32 object-contain'

    domProductThumbnail.appendChild(thumbnail);

    console.log(data);

    data.image.map((element, i) => {
        const image =  document.createElement('img');

        image.src = `${STORAGE_URL}/${element.url}`;
        image.alt = data.name;
        image.classList = 'w-32 h-32 object-contain'

        domProductImages.appendChild(image);
    });
};

(() => { setProductData() })();