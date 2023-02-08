
// Panier
// ici on récupère le panier
let cart = JSON.parse(window.localStorage.getItem("cart"));

let totalQuantityCart = 0;
let totalPriceCart = 0;
// si il est différent de null on créer un for avec une requête demandant l'id du produit dans le panier
if (cart !== null) {
    for (let productInCart of cart) {
        fetch('http://localhost:3000/api/products/' + productInCart.id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {
                // fait appel à la fonction generateHtml
                generateHtml(product, productInCart);
            });
    }
}

function generateHtml(product, productInCart) {
    // fonction qui va permettre d'afficher le modèle, la quantité, la couleur et le prix dans le panier
    let sectionId = document.getElementById("cart__items");
    let article = document.createElement("article");

    article.classList.add("cart__item");
    sectionId.appendChild(article);

    article.setAttribute("data-id", productInCart.id);

    article.setAttribute("data-color", productInCart.color);

    let divImg = document.createElement("div");
    divImg.classList.add("cart__item__img");
    let image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;

    article.appendChild(divImg);
    divImg.appendChild(image);

    let divContent = document.createElement("div");
    divContent.classList.add("cart__item__content");
    article.appendChild(divContent);

    let divDescription = document.createElement("div");
    divDescription.classList.add("cart__item__content__description");
    divContent.appendChild(divDescription);

    let productName = document.createElement("h2");
    let productColor = document.createElement("p");
    let productPrice = document.createElement("p");

    divDescription.appendChild(productName);
    divDescription.appendChild(productColor);
    divDescription.appendChild(productPrice);

    productName.innerText = product.name;
    productColor.innerText = productInCart.color;
    productPrice.innerText = product.price + "€";

    let divSettings = document.createElement("div");
    divSettings.classList.add("cart__item__content__settings");
    divContent.appendChild(divSettings);

    let divSettingsQuantity = document.createElement("div");
    divSettingsQuantity.classList.add("cart__item__content__settings__quantity");
    divSettings.appendChild(divSettingsQuantity);

    let pQuantity = document.createElement("p");
    divSettingsQuantity.appendChild(pQuantity);

    let inputQuantity = document.createElement("input");
    divSettingsQuantity.appendChild(inputQuantity);

    inputQuantity.classList.add("itemQuantity");
    inputQuantity.setAttribute("type", "number");
    inputQuantity.name = "itemQuantity";
    inputQuantity.min = "1";
    inputQuantity.max = "100";
    inputQuantity.value = productInCart.quantity;

    // on fait appel à la fonction updateProductQuantity
    inputQuantity.addEventListener("change", function (event) {
        updateProductQuantity(event, productInCart, product);
    });

    divSettingsQuantity.appendChild(pQuantity);
    divSettingsQuantity.appendChild(inputQuantity);
    pQuantity.innerText = "Qté : ";

    let divSettingsDelete = document.createElement("div");
    divSettingsDelete.classList.add("cart__item__content__settings__delete");
    divSettings.appendChild(divSettingsDelete);

    let pDelete = document.createElement("p");
    pDelete.classList.add("deleteItem");
    divSettingsDelete.appendChild(pDelete);
    pDelete.innerText = "Supprimer";

    // delete : 
    // on fait appel à la fonction deleteProductFromCart
    pDelete.addEventListener("click", function (eventDelete) {
        deleteProductFromCart(eventDelete, productInCart, product, article);
    });

    let parseQuantity = parseInt(productInCart.quantity);

    // calcul de la quantité et du prix total dans le panier 
    totalQuantityCart = totalQuantityCart + parseQuantity;
    totalPriceCart = totalPriceCart + (parseInt(product.price) * parseQuantity);

    updateTotal(totalPriceCart, totalQuantityCart);
}

function updateProductQuantity(event, productInCart, product) {
    // fonction qui met à jour la quantité d'un produit dans le panier et donc la qtité totale et le prix total
    event.preventDefault();
    let newQuantity = event.target.value;

    if (newQuantity > productInCart.quantity) {
        let addedQuantity = newQuantity - productInCart.quantity;
        totalQuantityCart = totalQuantityCart + addedQuantity;

        let addedPrice = product.price * parseInt(addedQuantity);
        totalPriceCart = totalPriceCart + addedPrice;
    } else {
        let removedQuantity = productInCart.quantity - newQuantity;
        totalQuantityCart = totalQuantityCart - removedQuantity;

        let removedPrice = product.price * parseInt(removedQuantity);
        totalPriceCart = totalPriceCart - removedPrice;
    }

    updateTotal(totalPriceCart, totalQuantityCart);

    productInCart.quantity = newQuantity;
    // mise à jour du localstorage
    window.localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteProductFromCart(eventDelete, productInCart, product, article) {
    // fonction permettant de supprimer article du panier
    eventDelete.preventDefault();
    // on trouve l'emplacement dans le tableau cart, et on supprime l'article du panier
    let index = cart.findIndex((product) => product.id == productInCart.id);
    cart.splice(index, 1);

    // mise à jour de la quantité
    let removedQuantity = productInCart.quantity;
    totalQuantityCart = totalQuantityCart - removedQuantity;

    // mise à jour du prix 
    let removedPrice = (product.price) * parseInt(removedQuantity);
    totalPriceCart = totalPriceCart - removedPrice;

    updateTotal(totalPriceCart, totalQuantityCart);

    // suppression de l'article en html
    article.remove();

    // mise à jour du localstorage
    window.localStorage.setItem("cart", JSON.stringify(cart));
}

function updateTotal(totalPriceCart, totalQuantityCart) {
    let spanQuantity = document.getElementById("totalQuantity");
    let spanPrice = document.getElementById("totalPrice");

    spanQuantity.innerText = totalQuantityCart;
    spanPrice.innerText = totalPriceCart;
}

// Formulaire / coordonnées de l'utilisateur
let isFirstNameValid = false;
let isLastNameValid = false;
let isAddressValid = false;
let isCityValid = false;
let isEmailValid = false;

let firstNameErrorMsg = "Veuillez renseigner un prénom";
let lastNameErrorMsg = "Veuillez renseigner un nom";
let addressErrorMsg = "Veuillez renseigner une adresse";
let cityErrorMsg = "Veuillez renseigner une ville";
let emailErrorMsg = "Veuillez renseigner une adresse mail";


let inputFirstName = document.getElementById("firstName");
let pFirstNameError = document.getElementById("firstNameErrorMsg");
pFirstNameError.innerText = firstNameErrorMsg;

inputFirstName.addEventListener("input", function (event) {
    // écoute l'input et fait appel à la fonction checkField pour chaque input
    isFirstNameValid = checkFieldValid(event, pFirstNameError, firstNameErrorMsg, /^[a-zA-Z]+$/);
});

let inputLastName = document.getElementById("lastName");
let pLastNameError = document.getElementById("lastNameErrorMsg");
pLastNameError.innerText = lastNameErrorMsg;

inputLastName.addEventListener("input", function (event) {
    isLastNameValid = checkFieldValid(event, pLastNameError, lastNameErrorMsg, /^[a-zA-Z]+$/);
});

let inputAddress = document.getElementById("address");
let pAddressError = document.getElementById("addressErrorMsg");
pAddressError.innerText = addressErrorMsg;

inputAddress.addEventListener("input", function (event) {
    isAddressValid = checkFieldValid(event, pAddressError, addressErrorMsg, null);
});

let inputCity = document.getElementById("city");
let pCityError = document.getElementById("cityErrorMsg");
pCityError.innerText = cityErrorMsg;

inputCity.addEventListener("input", function (event) {
    isCityValid = checkFieldValid(event, pCityError, cityErrorMsg, /^[a-zA-Z]+$/);
});

let inputEmail = document.getElementById("email");
let pEmailError = document.getElementById("emailErrorMsg");
pEmailError.innerText = emailErrorMsg;

inputEmail.addEventListener("input", function (event) {
    isEmailValid = checkFieldValid(event, pEmailError, emailErrorMsg, /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);
});

// bouton commander
let inputCommander = document.getElementsByClassName("cart__order__form")[0];

inputCommander.addEventListener("submit", function (event) {
    // écoute l'évenement et fait appel à la fonction getJsonBody et fait une requête et post au back
    event.preventDefault();
    if (isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid) {
        let jsonBody = getJsonBody(cart, inputFirstName, inputLastName, inputAddress, inputCity, inputEmail);
        // si infos ok on récupère JsonBody et on requête le back pour post les coordonnées
        fetch('http://localhost:3000/api/products/order/', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonBody)
        })

            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((response) => {
                // si reponse ok nous renvoie sur la page confirmation de commande avec le numéro de commande
                document.location.href = 'confirmation.html?orderId=' + response.orderId;
            });


    }
});

function checkFieldValid(event, pError, errorMsg, regex) {
    // fonction qui vérifie que nous avons un événement que c'est valid, qu'il y a un message d'erreur si non valid et des regex
    event.preventDefault();
    let value = event.target.value;

    let regexValid = true;
    if (regex != null) {
        regexValid = value.match(regex);
    }

    if (value != '' && regexValid) {
        pError.innerText = '';

        return true;
    } else {
        pError.innerText = errorMsg;

        return false;
    }
}

function getJsonBody(cart, inputFirstName, inputLastName, inputAddress, inputCity, inputEmail) {
    // fonction qui récupère le corps du fichier Json en nous donnant que les Id des articles du panier 
    let productIds = cart.map((product) => product.id);

    // les données utiliateurs sont stockés dans cette variable les informations sont envoyées au back qui les vérifies et nous retourne la réponse Jsonbody
    let jsonBody = {
        contact: {
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            address: inputAddress.value,
            city: inputCity.value,
            email: inputEmail.value
        },
        products: productIds
    };

    return jsonBody;
}