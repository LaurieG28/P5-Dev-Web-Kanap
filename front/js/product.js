const url = new URL(window.location.href);
const id = url.searchParams.get("id");

fetch('http://localhost:3000/api/products/' + id)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })

    .then(function (jsonPromise) {
        const product = jsonPromise
        console.log(jsonPromise);

        const itemImage = document.querySelector(".item__img");
        const image = document.createElement("img");

        itemImage.appendChild(image);
        image.src = product.imageUrl;
        image.alt = product.altTxt;

        const titleElement = document.getElementById("title");
        titleElement.innerText = product.name;

        const priceElement = document.getElementById("price");
        priceElement.innerText = product.price;

        const descriptionElement = document.getElementById("description");
        descriptionElement.innerText = product.description;

        const selectElement = document.getElementById("colors");
        const colors = product.colors;

        for (const color of colors) {
            const optionElement = document.createElement("option");
            optionElement.innerText = color;
            optionElement.value = color;
            selectElement.appendChild(optionElement);
        }

        selectElement.addEventListener("change", function (eventChange) {
            console.log(eventChange);
        });

        const cart = document.getElementById("addToCart");
        cart.addEventListener("click", function (event) {
            event.preventDefault();
            //selectElement.selectedOptions[0].value;//

            const quantity = document.getElementById("quantity");
        });
    })
    .catch(function (error) {
        console.log(error);
    })



