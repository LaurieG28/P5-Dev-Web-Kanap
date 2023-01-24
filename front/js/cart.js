const cart = JSON.parse(window.localStorage.getItem("cart"));
console.log(cart);

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
                        spanQuantity.innerText = totalQuantityCart;

                        // Ici modifié prix avec +
                        let addedPrice = product.price * parseInt(addedQuantity);
                        console.log(addedPrice)

                        totalPriceCart = totalPriceCart + addedPrice;
                        spanPrice.innerText = totalPriceCart;
                        console.log(totalPriceCart)

                    } else {
                        let removedQuantity = productInCart.quantity - newQuantity;
                        totalQuantityCart = totalQuantityCart - removedQuantity;

                        // Ici modifié prix avec -
                        let removedPrice = product.price * parseInt(removedQuantity);
                        totalPriceCart = totalPriceCart - removedPrice;
                        spanPrice.innerText = totalPriceCart;
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





