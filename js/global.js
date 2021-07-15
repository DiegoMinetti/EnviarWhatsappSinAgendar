let enviarMensaje = document.querySelector("#enviarMensaje");
let numero = document.querySelector(".numero");
numero.addEventListener("change", () => {
    enviarMensaje.action = `https://wa.me/549${numero.value}?text=Contacto%20desde%20Few%20Lines`;
});