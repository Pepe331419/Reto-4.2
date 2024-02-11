import { fullMenu, nonVeganIngredients, listOfIngredients } from "./data.js";

document.addEventListener('DOMContentLoaded', function () {
    var dishTemplate = document.getElementById("dishTemplate").content;
    var mainBody = document.getElementById("mainBody");

    function createMenu() {
        fullMenu.forEach(dish =>{
            let newDish = dishTemplate.cloneNode(true);

            //Crear nueva entradas
        })
    }
});