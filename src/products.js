import { API_URL } from "./config/config.js";
import { getProducts } from "./services.js";

const domProducts = document.getElementById('products-list');

const domPaginator = document.getElementById('paginator');

const removePagination = () => {
    domPaginator.innerHTML = '';
};

const addPagination = (link) => {
    link.map((element, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList = 'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        
        if(element.url) button.addEventListener('click', () => showProductsInDOM(element.url));

        button.innerHTML = `${element.label}`;
        li.appendChild(button);

        domPaginator.appendChild(li);
    });
};

export const showProductsInDOM = async (url = `${API_URL}/products`) => {
    const { data, links, meta } = await getProducts(url);

    removePagination();

    domProducts.innerHTML = '';

    data.map((element, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td
                class="px-6 py-4 whitespace-nowrap"
            >
                <div
                    class="flex items-center"
                >
                    <div
                        class="flex-shrink-0 h-10 w-10"
                    >
                        <img
                            class="h-10 w-10 rounded-full"
                            src=${element.thumbnail}
                            alt=""
                        />
                    </div>
                    <div class="ml-4">
                        ${element.name}
                    </div>
                </div>
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
                ${element.price}
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
                ${element.sku}
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap"
            >
                <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                >
                    ${element.stock}
                </span>
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
            >
                <a
                    href="/editProduct#${element.id}"
                    class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                >
            </td>
        `;

        domProducts.appendChild(tr);
    });

    addPagination(links);
};