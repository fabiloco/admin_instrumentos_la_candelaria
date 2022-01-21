import { API_URL } from "./config/config.js";

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

export const login = async (user) => {
    const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', headers, body: JSON.stringify(user) });
    const data = await res.json();
    return data.access_token;
};

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