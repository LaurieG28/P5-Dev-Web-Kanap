// Fetch = envoie la requête avec l'url au back (créer une promesse)
fetch('http://localhost:3000/api/products/')
    // Then = Attends la promesse et mets le résultat dans l'entrée de la fonction (reponse = résultat du back)
    .then(function (response) {
        // Vérifie que la requête soit ok et pas en erreur
        if (response.ok) {
            // La fonction .json() modifie le format du résultat en json (format pratique et utile pour les traitements en javascript), renvoi aussi un promesse
            return response.json();
        }
    })
    // Attends la promesse du .json() et mets le resultat (le résultat transformé en json) dans l'entrée de la fonction (reponse = résultat en json)
    .then(function (jsonPromise) {
        const items = document.getElementById("items");
        const products = jsonPromise;
        // Affiche la variable products dans la console du navigateur web
        console.log(products);

        for (const product of products) {
            const a = document.createElement("a");
            const article = document.createElement("article");
            const image = document.createElement("img");
            const name = document.createElement("h3");
            const description = document.createElement("p");

            a.href = "./product.html?id=" + product._id;
            image.src = product.imageUrl;
            image.alt = product.altTxt;
            name.classList.add("productName");
            name.innerText = product.name;
            description.classList.add("productDescription");
            description.innerText = product.description;

            article.appendChild(image);
            article.appendChild(name);
            article.appendChild(description);
            a.appendChild(article);
            items.appendChild(a);
        }
    })
    // Si le fetch est en erreur (mauvaise url, back éteint, etc...) passe dans le catch (attraper) et mets l'erreur en entrée de la fonction
    .catch(function (err) {
        // Affiche l'erreur dans la console du navigateur web
        console.log(err);
    });