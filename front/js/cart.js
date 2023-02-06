
// Panier

let cart = JSON.parse(window.localStorage.getItem("cart"));

let totalQuantityCart = 0;
let totalPriceCart = 0;

if (cart !== null) {
    for (let productInCart of cart) {
        fetch('http://localhost:3000/api/products/' + productInCart.id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(function (product) {
                generateHtml(product);
            });
    }
}

function generateHtml(product) {
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

    inputQuantity.addEventListener("change", updateProductQuantity);

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
    pDelete.addEventListener("click", deleteProductFromCart);

    let parseQuantity = parseInt(productInCart.quantity);

    totalQuantityCart = totalQuantityCart + parseQuantity;
    totalPriceCart = totalPriceCart + (parseInt(product.price) * parseQuantity);

    let spanQuantity = document.getElementById("totalQuantity");
    spanQuantity.innerText = totalQuantityCart;
    let spanPrice = document.getElementById("totalPrice");
    spanPrice.innerText = totalPriceCart;
}

function updateProductQuantity(event) {
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
    };

    spanQuantity.innerText = totalQuantityCart;
    spanPrice.innerText = totalPriceCart;

    productInCart.quantity = newQuantity;
    window.localStorage.setItem("cart", JSON.stringify(cart));
}

function deleteProductFromCart(eventDelete) {
    eventDelete.preventDefault();
    let index = cart.findIndex((product) => product.id == productInCart.id);
    cart.splice(index, 1);

    let removedQuantity = productInCart.quantity;
    totalQuantityCart = totalQuantityCart - removedQuantity;
    spanQuantity.innerText = totalQuantityCart;

    let removedPrice = product.price * parseInt(removedQuantity);
    totalPriceCart = totalPriceCart - removedPrice;
    spanPrice.innerText = totalPriceCart;

    article.remove();

    window.localStorage.setItem("cart", JSON.stringify(cart));
}

// Formulaire
let isFirstNameValid = false;
let isLastNameValid = false;
let isAddressValid = false;
let isCityValid = false;
let isEmailValid = false;

let firstNameErrorMsg = "Veuillez renseigner un prénom";


let inputFirstName = document.getElementById("firstName");
let pFirstNameError = document.getElementById("firstNameErrorMsg");
pFirstNameError.innerText = firstNameErrorMsg;

inputFirstName.addEventListener("input", function (event) {
    checkFieldError(event, isFirstNameValid, pFirstNameError, /^[a-zA-Z]+$/);
});

let inputLastName = document.getElementById("lastName");
let pLastNameError = document.getElementById("lastNameErrorMsg");
pLastNameError.innerText = "Veuillez renseigner un nom";

inputLastName.addEventListener("input", function (event) {
    checkFieldError(event, isLastNameValid, pLastNameError, /^[a-zA-Z]+$/);
});

let inputAddress = document.getElementById("address");
let pAddressError = document.getElementById("addressErrorMsg");
pAddressError.innerText = "Veuillez remplir ce champ";

inputAddress.addEventListener("input", function (event) {
    checkFieldError(event, isAddressValid, pAddressError, null);
});

let inputCity = document.getElementById("city");
let pCityError = document.getElementById("cityErrorMsg");
pCityError.innerText = "Veuillez renseigner une ville";

inputCity.addEventListener("input", function (event) {
    checkFieldError(event, isCityValid, pCityError, /^[a-zA-Z]+$/);
});

let inputEmail = document.getElementById("email");
let pEmailError = document.getElementById("emailErrorMsg");
pEmailError.innerText = "Veuillez renseigner une adresse mail";

inputEmail.addEventListener("input", function (event) {
    checkFieldError(event, isEmailValid, pEmailError, /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/);
});

let inputCommander = document.getElementsByClassName("cart__order__form")[0];

inputCommander.addEventListener("submit", function (event) {
    event.preventDefault();
    if (isFirstNameValid && isLastNameValid && isAddressValid && isCityValid && isEmailValid) {
        let jsonBody = getJsonBody(cart, inputFirstName, inputLastName, inputAddress, inputCity, inputEmail);

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
                console.log("response: ", response);
                document.location.href = 'confirmation.html?orderId=' + response.orderId;
            });


    }
});

function checkFieldError(event, isFieldValid, pError, regex) {
    event.preventDefault();
    let value = event.target.value;

    let regexValid = true;
    if (regex != null) {
        regexValid = value.match(regex);
    }

    if (value != '' && regexValid) {
        isFieldValid = true;
        pError.innerText = '';
    } else {
        isFieldValid = false;
        pError.innerText = firstNameErrorMsg;
    }
}

function getJsonBody(cart, inputFirstName, inputLastName, inputAddress, inputCity, inputEmail) {
    let productIds = cart.map((product) => product.id);

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




