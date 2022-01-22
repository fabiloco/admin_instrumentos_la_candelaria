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
export const getProducts = async (url) => {
    const res = await fetch(`${API_URL}/products`, { method: 'GET', headers, });
    const data = await res.json();
    return { data: data.data, links: data.links, meta: data.meta };
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

    console.log(`${API_URL}/products/${id}`);

    const res = await fetch(`${API_URL}/products/${id}`, { method: 'POST',
        headers: { ...headers2, "Authorization": `Bearer ${token}` }, 
        body,
    });
    const data = await res.json();
};