//Dark Mode
const btnSwitch = document.querySelector('#switch');
const logo = document.querySelector('.logo');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    logo.src = '../assets/logo-desktop-modo-noc.svg';
    btnSwitch.textContent = 'MODO DIURNO';
    if(document.body.classList == ''){
        logo.src = '../assets/logo-desktop.svg';
        btnSwitch.textContent = 'MODO NOCTURNO';
    }
});

var offset = 0;
var MAX_FAVS = 12;

window.onload = () => {
    if(localStorage.getItem("gifsFavs")){
        let favList = JSON.parse(localStorage.getItem("gifsFavs"));

        if(favList.length == 0){
            document.getElementById("no-content").style.display = "block";
        }

        for(let i = 0; i < ((favList.length < 12) ? favList.length : MAX_FAVS); i++){
            new GifElement(favList[i].url, favList[i].title, favList[i].username, favList[i].id);
            document.getElementById(`${favList[i].id}-fav`).classList.add("fav-active");
        }

        if(favList.length > MAX_FAVS){
            const verMas = document.getElementById("verMasBtnFav");
            verMas.style.display = "flex";
            offset += MAX_FAVS;
            verMas.addEventListener('click', e => {
                offset = mostrarFavs(offset, MAX_FAVS, favList);
            });
        }
    }else{
        document.getElementById("no-content").style.display = "block";
    }
}

function mostrarFavs(offset, maximo, datos){
    for(let i = offset; i < (offset + maximo); i++){
        if(datos[i]){
            new GifElement(datos[i].url, datos[i].title, datos[i].username, datos[i].id);
        }else{
            
            break;
        }
    }

    if(datos.length > (offset + maximo)){
        return offset + maximo;
    }else{
        document.getElementById("verMasBtnFav").style.display = "none";
    }
}