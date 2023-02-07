// produit
// on récupère la nouvelle URL avec l'id du produit
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// on requête à nouveau le back mais avec l'id du canapé
fetch('http://localhost:3000/api/products/' + id)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        }
    })

    .then(function (product) {
        // on fait appel à la fonction generateHtml
        generateHtml(product);
    })
    .catch(function (error) {
    })

// fonction 
function generateHtml(product) {
    let itemImage = document.querySelector(".item__img");
    let image = document.createElement("img");

    itemImage.appendChild(image);
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    let titleElement = document.getElementById("title");
    titleElement.innerText = product.name;

    let priceElement = document.getElementById("price");
    priceElement.innerText = product.price;

    let descriptionElement = document.getElementById("description");
    descriptionElement.innerText = product.description;

    let selectElement = document.getElementById("colors");
    let colors = product.colors;

    // pour afficher les différentes couleurs on créer une boucle for avec les différentes options
    for (let color of colors) {
        let optionElement = document.createElement("option");
        optionElement.innerText = color;
        optionElement.value = color;
        selectElement.appendChild(optionElement);
    }

    let buttonElement = document.getElementById("addToCart");
    // pour ajouter l'article au panier on écoute et on fait appel à la fonction addProductToCart
    buttonElement.addEventListener("click", addProductToCart);
}

function addProductToCart(event) {
    event.preventDefault();

    let quantity = document.getElementById("quantity");
    let selectElement = document.getElementById("colors");

    let selectedColor = selectElement.value;
    let selectedQuantity = quantity.value;

    // booléens permettant de créer des conditions pour mettre à jour le panier dans le localstorage
    if (selectedColor != "" && selectedQuantity > 0) {

        let cart = JSON.parse(window.localStorage.getItem("cart"));

        let productForCart = {
            id: id,
            color: selectedColor,
            quantity: selectedQuantity,
        };

        // si panier null on créer et ajoute et enregistre le produit dans cart et dans localstorage
        if (cart == null) {
            cart = [];
            cart.push(productForCart);
            window.localStorage.setItem("cart", JSON.stringify(cart));

        } else {
            // sinon on créer une boucle for avec booléens pour vérifier les bonnes conditions pour mettre à jour le panier et localstorage
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
    }
}