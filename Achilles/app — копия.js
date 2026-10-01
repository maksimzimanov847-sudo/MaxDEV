//Модальное окно акции
const buttons = document.getElementsByClassName('fd');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function() {
        alert("Акция продлится до 27 июля 2029 года");
    };
}