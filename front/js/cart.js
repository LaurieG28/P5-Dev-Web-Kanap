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
            .then(function (jsonPromise) {
                const product = jsonPromise;

                let sectionId = document.getElementById("cart__items");
                let article = document.createElement("article");

                article.classList.add("cart__item");
                sectionId.appendChild(article);

                article.setAttribute("data-id", productInCart.id);
                console.log(article.getAttribute("data-id"));

                article.setAttribute("data-color", productInCart.color);
                console.log(article.getAttribute("data-color"));

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

                inputQuantity.addEventListener("change", function (event) {
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
                pDelete.addEventListener("click", function (eventDelete) {
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
                });

                let parseQuantity = parseInt(productInCart.quantity);

                totalQuantityCart = totalQuantityCart + parseQuantity;
                totalPriceCart = totalPriceCart + (parseInt(product.price) * parseQuantity);

                let spanQuantity = document.getElementById("totalQuantity");
                spanQuantity.innerText = totalQuantityCart;
                let spanPrice = document.getElementById("totalPrice");
                spanPrice.innerText = totalPriceCart;

            });
    }
}

let inputFirstName = document.getElementById("firstName");
let pFirstNameError = document.getElementById("firstNameErrorMsg");

inputFirstName.addEventListener("input", function (event) {
    event.preventDefault();
    let firstNameValue = event.target.value;

    if (firstNameValue != "" && firstNameValue.match(/^[a-zA-Z]+$/)) {
        isValid = true;
        pFirstNameError.innerText = "";
    } else {
        isValid = false;
        pFirstNameError.innerText = "Veuillez renseigner un prénom";
    }
});

let inputLastName = document.getElementById("lastName");
let pLastNameError = document.getElementById("lastNameErrorMsg");

inputLastName.addEventListener("input", function (event) {
    event.preventDefault();
    let lastNameValue = event.target.value;

    if (lastNameValue != "" && lastNameValue.match(/^[a-zA-Z]+$/)) {
        isValid = true;
        pLastNameError.innerText = "";
    } else {
        isValid = false;
        pLastNameError.innerText = "Veuillez renseigner un nom";
    }
});

let inputAddress = document.getElementById("address");
let pAddressError = document.getElementById("addressErrorMsg");

inputAddress.addEventListener("input", function (event) {
    event.preventDefault();
    let addressValue = event.target.value;

    if (addressValue != "") {
        isValid = true;
        pAddressError.innerText = "";
    } else {
        isValid = false;
        pAddressError.innerText = "Veuillez remplir ce champ";
    }
});

let inputCity = document.getElementById("city");
let pCityError = document.getElementById("cityErrorMsg");

inputCity.addEventListener("input", function (event) {
    event.preventDefault();
    let cityValue = event.target.value;

    if (cityValue != "" && cityValue.match(/^[a-zA-Z]+$/)) {
        isValid = true;
        pCityError.innerText = "";
    } else {
        isValid = false;
        pCityError.innerText = "Veuillez renseigner une ville";
    }
});

let inputEmail = document.getElementById("email");
let pEmailError = document.getElementById("emailErrorMsg");

inputEmail.addEventListener("input", function (event) {
    event.preventDefault();
    let emailValue = event.target.value;

    if (emailValue != "" && emailValue.match(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/)) {
        isValid = true;
        pEmailError.innerText = "";
    } else {
        isValid = false;
        pEmailError.innerText = "Veuillez renseigner une adresse mail";
    }
});

let inputCommander = document.getElementById("order");
inputCommander.addEventListener("input", function (event) {
    fetch('http://localhost:3000/api/products/order/',
        method: “POST”,
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
        body: JSON.stringify(jsonBody)
    )
});





