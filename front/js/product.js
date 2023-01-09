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

        const colorsElement = document.getElementById("colors");
        const colors = product.colors;

        for (const color of colors) {
            const optionElement = document.createElement("option");
            optionElement.innerText = color;
            optionElement.value = color;
            colorsElement.appendChild(optionElement);
        }

        const quantity = 
    })
    .catch(function (error) {
        console.log(error);
    })



