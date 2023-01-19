const cart = JSON.parse(window.localStorage.getItem("cart"));

for (let productInCart of cart) {
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










    console.dir(article);

}