
const container = document.getElementById("container");
const urlInput = document.getElementById("urlInput");
const imgTitle = document.getElementById("imgTitle");
const imgDesc = document.getElementById("imgDesc");

const btnAddPhoto = document.getElementById("addPhoto");

btnAddPhoto.addEventListener("click", () => {
    var url = urlInput.value;
    var title = imgTitle.value;
    var description = imgDesc.value
    try {
        var url = new URL(url)
    } catch {
        url = false
    }

    if (url) {
        // TITULO
        const titleElement = document.createElement("h1")
        titleElement.classList.add("titlePhoto")
        titleElement.innerHTML = title

        // IMAGEN
        const imgElement = document.createElement("img");
        imgElement.src = url;
        imgElement.alt = "Foto";
        imgElement.classList.add("imgElement")

        // DESCRIPCION
        const descriptionElement = document.createElement("h1");
        descriptionElement.classList.add("descPhoto")
        descriptionElement.classList.add("oculto")
        descriptionElement.innerHTML = description

        // DETALLES BOTON **********************************************************
        const seeBtn = document.createElement("button");
        seeBtn.innerText = "";
        seeBtn.classList.add("btn_add")
        seeBtn.addEventListener("click", () => {

            const seePhotoItem = document.createElement("div");
            seePhotoItem.classList.add("seePhoto");

            const popupContent = document.createElement("div");
            popupContent.classList.add("popup-content");

            const closeBtn = document.createElement("button");
            closeBtn.innerText = "";
            closeBtn.classList.add("closeBtn")
            closeBtn.addEventListener("click", () => {
                document.body.removeChild(seePhotoItem)
            })

            seeImg = imgElement.cloneNode(true)
            seeImg.classList.remove("imgElement")
            seeImg.classList.add("seeImg")

            seeTitle = titleElement.cloneNode(true)
            seeTitle.classList.remove("titlePhoto")
            seeTitle.classList.add("seeTitlePhoto")

            seeDesc = descriptionElement.cloneNode(true)
            seeDesc.classList.remove("oculto", "descPhoto")
            seeDesc.classList.add("seeDescPhoto")

            popupContent.appendChild(seeImg);
            popupContent.appendChild(seeTitle);
            popupContent.appendChild(seeDesc);

            seePhotoItem.appendChild(popupContent);
            seePhotoItem.appendChild(closeBtn);

            document.body.firstElementChild.before(seePhotoItem);
        })

        // BORRAR BOTON
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "";
        deleteBtn.classList.add("btn_delete");
        deleteBtn.addEventListener("click", () => {
            photoItem.style.opacity = "0"
            setTimeout(() => {
                container.removeChild(photoItem);
            }, 300);
        })

        // EDITAR BOTON
        const editBtn = document.createElement("button");
        editBtn.innerText = "";
        editBtn.classList.add("btn_edit");
        editBtn.addEventListener("click", () => {
            const newUrl = prompt("Ingrese la nueva URL de la imagen:", imgElement.src);
            const newTitle = prompt("Ingrese el nuevo título de la imagen:", titleElement.textContent);
            if (newUrl) {
                imgElement.src = newUrl;
            }
            if (newTitle) {
                titleElement.textContent = newTitle;
            }
        });

        // AGREGAR ELEMENTOS AL DIV
        const photoItem = document.createElement("div");
        photoItem.classList.add("photo");
        photoItem.appendChild(imgElement);
        photoItem.appendChild(titleElement);
        photoItem.appendChild(descriptionElement);
        photoItem.appendChild(deleteBtn);
        photoItem.appendChild(seeBtn);
        photoItem.appendChild(editBtn);

        // CREAR LISTA DE IMAGENES
        const existingPhotos = document.querySelectorAll(".photo");
        if (existingPhotos.length > 0) {
            let photoOptions = "0. Agregar al final\n";
            let index =0
            // RECORRER LISTA PARA MOSTRAR OPCIONES
            for (const photo of existingPhotos) {
                const imgTitle = photo.querySelector(".titlePhoto").textContent;
                photoOptions += `${index + 1}. ${imgTitle}\n`;
                index++
            }

            const choice = prompt(`Seleccione una imagen para agregar antes o después:\n${photoOptions}`);
            
            const choiceIndex = parseInt(choice) - 1;

            // COLOCAR LA IMAGEN SEGUN LA OPCION
            if (choiceIndex >= 0 && (choiceIndex < existingPhotos.length)) {
                const position = prompt("Desea agregar la imagen antes o despues de la imagen seleccionada? (antes/despues)");
                const referencePhoto = existingPhotos[choiceIndex];
                if (position === "antes") {
                    container.insertBefore(photoItem, referencePhoto);
                } else if (position === "despues") {
                    referencePhoto.insertAdjacentElement('afterend', photoItem);
                } else {
                    container.appendChild(photoItem);
                }
            } else {
                container.appendChild(photoItem);
            }
        } else {
            container.appendChild(photoItem);
        }

        // TRANSICION AGREGAR IMAGENS
        setTimeout(() => {
            photoItem.style.opacity = "1"
        }, 300);

        //VACIAR INPUTS
        urlInput.value = "";
        imgTitle.value = "";
        imgDesc.value = "";
    } else {
        alert("Por favor, ingresa una URL válida.");
    }
});
