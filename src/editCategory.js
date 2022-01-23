import { auth } from "./auth.js";
import { getCategory, updateCategory } from "./services.js";

const id = window.location.hash.slice(1);

const token = auth();

const domCategoryName = document.getElementById('category-name');
const domCategoryDescription = document.getElementById('category-description');


const domFormEdit = document.getElementById('category-form');

const category = {
    name: '',
    description: '',
};

domCategoryName.addEventListener('keyup', (e) => {
    category.name = e.target.value;
});

domCategoryDescription.addEventListener('keyup', (e) => {
    category.description = e.target.value;
});

domFormEdit.addEventListener('submit', async (e) => {
    e.preventDefault();

    await updateCategory(id, category, token);

    Swal.fire({
        title: 'Exito!',
        text: 'Producto actualizado exitosamente',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
})

const setCategoryData = async () => {
    const data = await getCategory(id);

    category.name = data.name;
    category.description = data.description;

    domCategoryName.value = data.name;
    domCategoryDescription.value = data.description;
};

(() => { setCategoryData() })();