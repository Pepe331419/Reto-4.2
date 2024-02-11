export var fullMenu = [
    {
        "name": "Paella de mariscos",
        "photo": "https://picsum.photos/300/300?random=1",
        "ingredients": ["Arroz", "Mariscos variados", "Pimiento", "Azafrán", "Aceite de oliva", "Cebolla", "Ajo"],
        "intolerances": []
    },
    {
        "name": "Lomo saltado",
        "photo": "https://picsum.photos/300/300?random=2",
        "ingredients": ["Lomo de res", "Cebolla", "Tomate", "Pimiento", "Papas fritas", "Salsa de soja", "Vinagre", "Ajo"],
        "intolerances": []
    },
    {
        "name": "Ensalada César",
        "photo": "https://picsum.photos/300/300?random=3",
        "ingredients": ["Lechuga romana", "Pollo a la parrilla", "Pan tostado", "Queso parmesano", "Aderezo César"],
        "intolerances": ["Lactosa"]
    },
    {
        "name": "Tacos al pastor",
        "photo": "https://picsum.photos/300/300?random=4",
        "ingredients": ["Carne de cerdo marinada", "Piña", "Cebolla", "Cilantro", "Tortillas de maíz"],
        "intolerances": ["Gluten"]
    },
    {
        "name": "Sushi variado",
        "photo": "https://picsum.photos/300/300?random=5",
        "ingredients": ["Salmón", "Atún", "Arroz para sushi", "Alga nori", "Aguacate", "Pepino", "Salsa de soja", "Wasabi", "Jengibre encurtido"],
        "intolerances": ["Gluten"]
    },
    {
        "name": "Pasta Alfredo",
        "photo": "https://picsum.photos/300/300?random=6",
        "ingredients": ["Pasta fettuccine", "Crema de leche", "Mantequilla", "Ajo", "Queso parmesano"],
        "intolerances": ["Lactosa"]
    },
    {
        "name": "Hamburguesa clásica",
        "photo": "https://picsum.photos/300/300?random=7",
        "ingredients": ["Carne de res", "Pan de hamburguesa", "Lechuga", "Tomate", "Cebolla", "Queso cheddar", "Salsa de tomate", "Mayonesa"],
        "intolerances": ["Gluten", "Lactosa"]
    },
    {
        "name": "Ceviche peruano",
        "photo": "https://picsum.photos/300/300?random=8",
        "ingredients": ["Pescado blanco", "Limón", "Cebolla roja", "Cilantro", "Ají limo", "Maíz", "Camote"],
        "intolerances": []
    },
    {
        "name": "Pizza margarita",
        "photo": "https://picsum.photos/300/300?random=9",
        "ingredients": ["Masa de pizza", "Salsa de tomate", "Mozzarella", "Albahaca fresca", "Aceite de oliva"],
        "intolerances": ["Gluten", "Lactosa"]
    },
    {
        "name": "Filete de salmón a la plancha",
        "photo": "https://picsum.photos/300/300?random=10",
        "ingredients": ["Filete de salmón", "Aceite de oliva", "Sal", "Pimienta", "Limón"],
        "intolerances": []
    },
    {
        "name": "Pulpo a la gallega",
        "photo": "https://picsum.photos/300/300?random=11",
        "ingredients": ["Pulpo", "Patatas cocidas", "Pimentón dulce", "Sal", "Aceite de oliva"],
        "intolerances": []
    },
    {
        "name": "Pad Thai",
        "photo": "https://picsum.photos/300/300?random=12",
        "ingredients": ["Fideos de arroz", "Pollo", "Huevos", "Cacahuetes", "Brotes de soja", "Cebolla", "Cilantro", "Salsa de tamarindo"],
        "intolerances": ["Gluten"]
    },
    {
        "name": "Gazpacho",
        "photo": "https://picsum.photos/300/300?random=13",
        "ingredients": ["Tomate", "Pimiento", "Pepino", "Cebolla", "Ajo", "Vinagre de Jerez", "Aceite de oliva"],
        "intolerances": []
    },
    {
        "name": "Tarta de chocolate",
        "photo": "https://picsum.photos/300/300?random=14",
        "ingredients": ["Chocolate negro", "Huevos", "Azúcar", "Harina", "Mantequilla"],
        "intolerances": ["Gluten", "Lactosa"]
    },
    {
        "name": "Sopa de pollo",
        "photo": "https://picsum.photos/300/300?random=15",
        "ingredients": ["Pollo", "Verduras variadas", "Fideos", "Caldo de pollo"],
        "intolerances": ["Gluten"]
    },
    {
        "name": "Croquetas de jamón",
        "photo": "https://picsum.photos/300/300?random=16",
        "ingredients": ["Jamón serrano", "Leche", "Harina", "Huevo", "Pan rallado"],
        "intolerances": ["Gluten", "Lactosa"]
    },
    {
        "name": "Lasagna bolognesa",
        "photo": "https://picsum.photos/300/300?random=17",
        "ingredients": ["Carne de res", "Pasta para lasaña", "Salsa de tomate", "Queso mozzarella", "Queso parmesano", "Bechamel"],
        "intolerances": ["Gluten", "Lactosa"]
    },
    {
        "name": "Empanadas argentinas",
        "photo": "https://picsum.photos/300/300?random=18",
        "ingredients": ["Carne picada", "Cebolla", "Pimiento", "Aceitunas", "Huevo duro", "Masa para empanadas"],
        "intolerances": ["Gluten"]
    }
]

export const nonVeganIngredients = [
    "Lomo de res",
    "Pollo",
    "Carne de cerdo",
    "Salmón",
    "Pescado blanco",
    "Huevos",
    "Pollo",
    "Jamón serrano",
    "Carne de res",
    "Carne picada",
    "Huevo duro",
    "Queso cheddar",
    "Mozzarella",
    "Queso parmesano",
    "Queso mozzarella",
    "Leche",
    "Mantequilla",
    "Crema de leche"
];


let listOfIngredients = [];

fullMenu.forEach(dish=>{
    dish.ingredients.forEach(ingredient => {
        if (!listOfIngredients.includes(ingredient)){
            listOfIngredients.push(ingredient);
        }
    })
})

listOfIngredients.sort();

export { listOfIngredients };