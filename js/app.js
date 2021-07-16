document.addEventListener('DOMContentLoaded', (event) => {
    let enviarMensaje = document.querySelector("#enviarMensaje");
    let numero = document.querySelector(".numero");
    let text = document.querySelector(".text");
    text.value = localStorage.getItem('text');
    numero.addEventListener("change", () => {
        enviarMensaje.action = `https://wa.me/549${numero.value}`;
    });
    text.addEventListener("change", () => {
        localStorage.setItem('text', text.value);
    });
    if (text.value != ""){
        text.parentElement.querySelector("label").classList.add("active");
    }
    M.textareaAutoResize(text);
    M.AutoInit();
});
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker
        .register("/js/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}