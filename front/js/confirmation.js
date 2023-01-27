let url = new URL(window.location.href);
let id = url.searchParams.get("orderId");
let orderId = document.getElementById("orderId");
orderId.innerText = id;


console.log(url);
console.log(id);