const photoContainer = document.getElementById('photoContainer');
const urlInput = document.getElementById('urlInput');
const addPhotoBtn = document.getElementById('addPhotoBtn');

// Función para agregar foto
addPhotoBtn.addEventListener('click', () => {
    const url = urlInput.value;
    if (url) {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        imgElement.alt = 'Foto';

        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item');
        photoItem.appendChild(imgElement);
        console.log(photoItem)
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener("click", () => {
            console.log(photoItem)
            photoContainer.removeChild(photoItem);
        })

        photoItem.appendChild(deleteBtn);
        photoContainer.appendChild(photoItem);

        // Limpiar el input
        urlInput.value = '';
    } else {
        alert('Por favor, ingresa una URL válida.');
    }
});
