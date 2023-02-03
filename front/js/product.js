// produit
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

        const buttonElement = document.getElementById("addToCart");
        buttonElement.addEventListener("click", function (event) {
            event.preventDefault();
            const quantity = document.getElementById("quantity");

            const selectedColor = selectElement.value;
            const selectedQuantity = quantity.value;

            let cart = JSON.parse(window.localStorage.getItem("cart"));

            let productForCart = {
                id: id,
                color: selectedColor,
                quantity: selectedQuantity,
            };

            if (cart == null) {
                cart = [];
                cart.push(productForCart);
                window.localStorage.setItem("cart", JSON.stringify(cart));

            } else {
                let addNewProductInCart = true;

                for (let productInCart of cart) {

                    if (productForCart.id == productInCart.id && productForCart.color == productInCart.color) {
                        let newQuantity = parseInt(productForCart.quantity) + parseInt(productInCart.quantity);

                        productInCart.quantity = newQuantity;
                        window.localStorage.setItem("cart", JSON.stringify(cart));
                        addNewProductInCart = false;
                    }
                }

                if (addNewProductInCart == true) {
                    cart.push(productForCart);
                    window.localStorage.setItem("cart", JSON.stringify(cart));
                }
            }

        })

    })
    .catch(function (error) {
        console.log(error);
    })
