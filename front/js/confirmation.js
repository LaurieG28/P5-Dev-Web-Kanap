// url de la page confirmation on récupère le numéro de commande
let url = new URL(window.location.href);
let id = url.searchParams.get("orderId");
let orderId = document.getElementById("orderId");
// on vient afficher le numéro de commande dans le html
orderId.innerText = id;
