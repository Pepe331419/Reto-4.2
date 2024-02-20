document.addEventListener('DOMContentLoaded', function () {
    var dishTemplate = document.getElementById("dishTemplate").content;
    var mainBody = document.getElementById("mainBody");
    var radioInputs = document.querySelectorAll("input[type='radio']");
    var checkboxInputs = document.querySelectorAll("input[type='checkbox']");
    var openSticky = document.getElementById("openSticky");
    var closeSticky = document.getElementById("closeSticky");
    var stickyMenu = document.getElementById("stickyMenu");
    var fullMenu;
    var nonVeganIngredients;

    
    radioInputs.forEach(input => {
        input.addEventListener("change", () => {
            createMenu();
        });
    });

    checkboxInputs.forEach(input => {
        input.addEventListener("change", () => {
            var inputId = input.id;
            var inputValue = input.checked;
            var rawFilters = localStorage.getItem("filters") ? JSON.parse(localStorage.getItem("filters")) : {}
            rawFilters[inputId] = inputValue;
            localStorage.setItem("filters", JSON.stringify(rawFilters));
            createMenu();
        });
    })

    closeSticky.addEventListener("click", () => {
        stickyMenu.classList.remove("active");
        stickyMenu.classList.add("inactive");

        openSticky.classList.add("active");
        openSticky.classList.remove("inactive");
    })

    openSticky.addEventListener("click", () => {
        stickyMenu.classList.add("active");
        stickyMenu.classList.remove("inactive");

        openSticky.classList.remove("active");
        openSticky.classList.add("inactive");
    })


    function createMenu() {
        cleanMenu();

        var selectedOrder = document.querySelector("input[name='orderBy']:checked").value;
        orderBy(selectedOrder);

        let filteredMenu = checkFilters(fullMenu);

        filteredMenu.forEach(dish => {
            let newDish = dishTemplate.cloneNode(true);

            newDish.querySelector(".dishImage").querySelector('.mainImg').setAttribute('src', dish.photo);

            let favImg;
            let favAlt;
            let parsedFavs;
            let userData = localStorage.getItem('favDishes');
            userData ? parsedFavs = JSON.parse(userData) : parsedFavs = [];
            if (parsedFavs.indexOf(dish.name) == -1) {
                favImg = "FavOff"
                favAlt = "Guardar en favoritos"
            } else {
                favImg = "FavOn";
                favAlt = "Eliminar de favoritos"
            }

            newDish.querySelector(".dishName").innerHTML = "<h1>" + dish.name + "</h1>";
            newDish.querySelector(".dishName").innerHTML += '<a class="favIcon" href="#"><img src="static/img/' + favImg + '.png" alt="' + favAlt + '"></a>';
            newDish.querySelector(".dishName").querySelector(".favIcon").setAttribute("data-dishname", dish.name);
            newDish.querySelector(".dishName").querySelector(".favIcon").addEventListener("click", toggleFav);


            newDish.querySelector(".dishIngredients").innerHTML = "<p>" + dish.ingredients.join(", ") + "</p>";

            let dishIntolerances = newDish.querySelector(".dishIntolerances");
            let veganImg;
            let glutenImg;
            let lactoseImg;
            let veganAlt;
            let glutenAlt;
            let lactoseAlt;
            if (dish.ingredients.some(ingredient => nonVeganIngredients.includes(ingredient))) {
                veganImg = "ConAnimal";
                veganAlt = "No apto para veganos";
            } else {
                veganImg = "SinAnimal";
                veganAlt = "Apto para veganos";
            }

            if (dish.intolerances.indexOf("Gluten") != -1) {
                glutenImg = "ConGluten";
                glutenAlt = "No apto para celíacos";
            } else {
                glutenImg = "SinGluten";
                glutenAlt = "Apto para celíacos";
            }

            if (dish.intolerances.indexOf("Lactosa") != -1) {
                lactoseImg = "ConLactosa";
                lactoseAlt = "No apto para intolerantes a la lactosa";
            } else {
                lactoseImg = "SinLactosa";
                lactoseAlt = "Apto para intolerantes a la lactosa";
            }

            dishIntolerances.querySelector(".intolVegan").setAttribute("src", "static/img/" + veganImg + ".png");
            dishIntolerances.querySelector(".intolGluten").setAttribute("src", "static/img/" + glutenImg + ".png");
            dishIntolerances.querySelector(".intolLactose").setAttribute("src", "static/img/" + lactoseImg + ".png");
            dishIntolerances.querySelector(".intolVegan").setAttribute("alt", veganAlt);
            dishIntolerances.querySelector(".intolGluten").setAttribute("alt", glutenAlt);
            dishIntolerances.querySelector(".intolLactose").setAttribute("alt", lactoseAlt);

            newDish.querySelector(".dishPrice").innerHTML = "<h2>" + dish.price + " €</h2>";

            mainBody.appendChild(newDish);
        })
    }

    function toggleFav(ev) {
        ev.preventDefault();
        let currentImg = this.querySelector("img");
        let userData = localStorage.getItem('favDishes');
        let dishName = this.getAttribute("data-dishname");
        let parsedFavs;

        userData ? parsedFavs = JSON.parse(userData) : parsedFavs = [];

        if (currentImg.src.includes("FavOff.png")) {
            currentImg.src = "static/img/FavOn.png";
            parsedFavs.push(dishName);
        } else {
            currentImg.src = "static/img/FavOff.png";
            let index = parsedFavs.indexOf(dishName);
            parsedFavs.splice(index, 1);
        }

        localStorage.setItem('favDishes', JSON.stringify(parsedFavs));
    }

    function cleanMenu() {
        document.getElementById("mainBody").innerHTML = "";
    }

    function orderBy(chosen) {
        if (chosen == "asc") {
            fullMenu.sort((a, b) => a.price - b.price);
        } else if (chosen == "desc") {
            fullMenu.sort((a, b) => b.price - a.price);
        }
    }

    function checkFilters(fullMenu) {
        let localFilters = JSON.parse(localStorage.getItem("filters"));

        let veganFilter = false;
        let glutenFilter = false;
        let lactoseFilter = false;

        if (!localFilters) {
            localFilters = {};
        } else {
            veganFilter = localFilters["filterVegan"];
            glutenFilter = localFilters["filterGluten"];
            lactoseFilter = localFilters["filterLactose"];
        }

        let tempMenu = fullMenu;

        if (veganFilter) {
            tempMenu = tempMenu.filter(dish => !dish.ingredients.some(ingredient => nonVeganIngredients.includes(ingredient)))
            document.getElementById("filterVegan").checked = true;
        };
        if (glutenFilter) {
            tempMenu = tempMenu.filter(dish => !dish.intolerances.includes("Gluten"))
            document.getElementById("filterGluten").checked = true;
        };
        if (lactoseFilter) {
            tempMenu = tempMenu.filter(dish => !dish.intolerances.includes("Lactosa"))
            document.getElementById("filterLactose").checked = true;
        };

        return tempMenu;
    }

    fetch('http://localhost:8000/data.json')
    .then(response=>response.json())
    .then(data => {
        fullMenu = data.fullMenu;
        nonVeganIngredients = data.nonVeganIngredients;
        createMenu();
        document.getElementById("loadingScreen").classList.add("hidden");
        setTimeout(() => {  
            document.getElementById("loadingScreen").classList.add("inactive");
        }, 3000);
    })
    .catch((error)=> {
        document.getElementById("errorScreen").classList.remove("inactive");
        document.getElementById("errorScreen").classList.add("active");
        console.error(error);
    })
    
});