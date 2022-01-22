import { API_URL } from "./config/config.js";

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

const headers2 = {
    "Accept": "application/json",
};

// AUTH
export const login = async (user) => {
    const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers, body: JSON.stringify(user) });
    const data = await res.json();
    return data.access_token;
};

// PRODUCTS
export const getProducts = async (url = `${API_URL}/products`) => {
    const res = await fetch(url, { method: 'GET', headers, });
    const data = await res.json();
    return { data: data.data, links: data.meta.links, meta: data.meta };
};

export const getProduct = async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, { method: 'GET', headers, });
    const data = await res.json();
    return data.data;
};

export const updateProduct = async (id, product, token) => {
    const body = new FormData();

    body.append('name', product.name);
    body.append('price', product.price);
    body.append('weight', product.weight);
    body.append('stock', product.stock);
    body.append('description', product.description);
    body.append('thumbnail', product.thumbnail);

    const res = await fetch(`${API_URL}/products/${id}`, { method: 'POST',
        headers: { ...headers2, "Authorization": `Bearer ${token}` }, 
        body,
    });
    const data = await res.json();
    return data;
};

export const storeProduct = async (product, token) => {
    const body = new FormData();

    console.log(product);

    body.append('name', product.name);
    body.append('price', product.price);
    body.append('weight', product.weight);
    body.append('stock', product.stock);
    body.append('description', product.description);
    body.append('thumbnail', product.thumbnail);

    // body.append('image[]', product.image);

    for(const image of product.images) {
        body.append('image', image);
    }

    const res = await fetch(`${API_URL}/products`, { method: 'POST',
        headers: { ...headers2, "Authorization": `Bearer ${token}` }, 
        body,
    });
    const data = await res.json();
    return data;
};

export const deteleProduct = async (id, token) => {

    const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE',
        headers: { ...headers,  "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return data.data;
};