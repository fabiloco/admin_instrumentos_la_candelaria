import { getProducts } from "./services.js";

const domProducts = document.getElementById('products-list');

export const showProductsInDOM = async () => {
    const { data, link, meta } = await getProducts();
    console.log(data);

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
};