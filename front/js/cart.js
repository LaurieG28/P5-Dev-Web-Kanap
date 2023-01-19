const cart = JSON.parse(window.localStorage.getItem("cart"));
console.log(cart);

for (let productInCart of cart) {
    if (cart !== null) {
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
        image.src = productInCart.imageUrl;
        image.alt = productInCart.altTxt;

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

        productName.innerText = productInCart.name;
        productColor.innerText = productInCart.color;
        productPrice.innerText = productInCart.price + "€";

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

        divSettingsQuantity.appendChild(pQuantity);
        divSettingsQuantity.appendChild(inputQuantity);
        pQuantity.innerText = "Qté : ";

        let divSettingsDelete = document.createElement("div");
        divSettingsDelete.classList.add("cart__item__content__settings__delete");
        divSettings.appendChild(divSettingsDelete);

        let pDelete = document.createElement("p");
        pDelete.classList.add("deleteitem");
        divSettingsDelete.appendChild(pDelete);
        pDelete.innerText = "Supprimer";

        let spanQuantity = document.getElementById("totalQuantity");
        // spanQuantity.id = ;
        let spanPrice = document.getElementById("totalPrice");
        // spanPrice.id = ;

    }
}