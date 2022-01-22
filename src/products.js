import { auth } from "./auth.js";
import { API_URL, STORAGE_URL } from "./config/config.js";
import { deteleProduct, getProducts } from "./services.js";

const token = auth();

const domProducts = document.getElementById('products-list');

const domPaginator = document.getElementById('paginator');


const removePagination = () => {
    domPaginator.innerHTML = '';
};

const addPagination = (link) => {
    link.map((element, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList = 'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        
        if(element.url) button.addEventListener('click', () => showProductsInDOM(element.url));

        button.innerHTML = `${element.label}`;
        li.appendChild(button);

        domPaginator.appendChild(li);
    });
};

const removeProduct = (id) => {
    Swal.fire({
        title: '¿Realmente quiere eliminar este elemento?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            deteleProduct(id, token);
            Swal.fire('Producto eliminado', '', 'success')
            showProductsInDOM();
        } else if (result.isDenied) {
            return;
        }
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
                            src=${STORAGE_URL}/${element.thumbnail}
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
        `;
        
        const td = document.createElement('td');
        td.classList = 'px-6 py-4 whitespace-nowrap text-right text-sm font-medium';

        const editBtn = document.createElement('a');
        editBtn.textContent = 'Editar';
        editBtn.href = `/editProduct#${element.id}`
        editBtn.classList = 'text-indigo-600 hover:text-indigo-900';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar'
        deleteBtn.addEventListener('click', (e) => removeProduct(element.id));
        deleteBtn.classList = 'text-red-600 hover:text-red-900 ml-3';
        
        td.appendChild(editBtn);
        td.appendChild(deleteBtn);
        
        tr.appendChild(td)

        domProducts.appendChild(tr);
    });

    addPagination(links);
};