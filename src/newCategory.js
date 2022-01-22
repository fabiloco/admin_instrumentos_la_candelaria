import { auth } from "./auth.js";
import { storeCategory } from "./services.js";

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

    await storeCategory(category, token);
    
    Swal.fire({
        title: 'Exito!',
        text: 'Categoria creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Cool'
    });
});