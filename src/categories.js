import { auth } from "./auth.js";
import { API_URL } from "./config/config.js";
import { deteleCategory, getCategories } from "./services.js";

const token = auth();

const domCategories = document.getElementById('categories-list');

const domPaginator = document.getElementById('paginator-categories');


const removePagination = () => {
    domPaginator.innerHTML = '';
};

const addPagination = (link) => {
    link.map((element, i) => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.classList = 'px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        
        if(element.url) button.addEventListener('click', () => showCategoriesInDOM(element.url));

        button.innerHTML = `${element.label}`;
        li.appendChild(button);

        domPaginator.appendChild(li);
    });
};

const removeCategory = (id) => {
    Swal.fire({
        title: '¿Realmente quiere eliminar este elemento?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        denyButtonText: `No`,
    }).then((result) => {
        if (result.isConfirmed) {
            deteleCategory(id, token);
            Swal.fire('Producto eliminado', '', 'success')
            showCategoriesInDOM();
        } else if (result.isDenied) {
            return;
        }
    });
};

export const showCategoriesInDOM = async (url = `${API_URL}/categories`) => {
    const { data, links } = await getCategories(url);

    removePagination();

    domCategories.innerHTML = '';

    data.map((element, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td
                class="px-6 py-4 whitespace-nowrap"
            >
                <div
                    class="flex items-center"
                >
                    <div class="ml-4">
                        ${element.name}
                    </div>
                </div>
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
                ${element.description}
            </td>
            <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
                ${element.id}
            </td>
        `;
        
        const td = document.createElement('td');
        td.classList = 'px-6 py-4 whitespace-nowrap text-right text-sm font-medium';

        const editBtn = document.createElement('a');
        editBtn.textContent = 'Editar';
        editBtn.href = `/editCategory#${element.id}`;
        editBtn.classList = 'text-indigo-600 hover:text-indigo-900 ml-3';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.addEventListener('click', (e) => removeCategory(element.id));
        deleteBtn.classList = 'text-red-600 hover:text-red-900 ml-3';
        
        td.appendChild(editBtn);
        td.appendChild(deleteBtn);
        
        tr.appendChild(td)

        domCategories.appendChild(tr);
    });

    addPagination(links);
};