function checkFavs(id){
    const favoritos = JSON.parse(localStorage.getItem("gifsFavs"));

    if(favoritos){
        for(let i = 0; i < favoritos.length; i++){
            if(favoritos[i].id == id){
                if(document.getElementById(`${id}-favtrend`)) document.getElementById(`${id}-favtrend`).classList.add("fav-active");
                if(document.getElementById(`${id}-fav`)) document.getElementById(`${id}-fav`).classList.add("fav-active");
                if(document.getElementById(`${id}-favmax`)) document.getElementById(`${id}-favmax`).classList.add("fav-active");
            }
        }
    }
}