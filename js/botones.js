// //Funcionalidad de btn Favoritos
// const gif = document.getElementsByClassName('gif');


function agregarFav(datos){
  const heart = document.getElementById(`${datos.id}-fav`);
  var favList = localStorage.getItem("gifsFavs");

  if(favList){
    favList = JSON.parse(favList);


    let flag = false;
    for(var i = 0; i < favList.length; i++){
      if(favList[i].id == datos.id){
        console.log(favList);
        flag = true;
        break;
      }
    }

    if(flag){
      //Sacarlo del localstorage
      favList.splice(i, 1);
      console.log(favList);
      localStorage.setItem("gifsFavs", JSON.stringify(favList));
      heart.classList.remove("fav-active");
    }else{
      //agregarlo al localstorage
      favList.push(datos);
      console.log(false);
      localStorage.setItem("gifsFavs", JSON.stringify(favList));
      heart.classList.add("fav-active");
    }
  }else{
    //Crear el localstorage con el item como primero
    let favList = [];
    favList.push(datos);
    localStorage.setItem("gifsFavs", JSON.stringify(favList));

    //Poner el corazon
    heart.classList.add("fav-active");
  }
}

class GifElement{
  constructor(url, title, username, id){
    this.datos = {
      url: url,
      title: title,
      username: username,
      id: id
    }
    this.crearElemento(url, title, username, id);
    
  }

  crearElemento(url, title, username, id){
    const divContainer = document.createElement('div');
    divContainer.classList.add('divResult');

    const divImg = document.createElement('div');
    divImg.classList.add('gifImg');

    const img = document.createElement('img');
    img.src = url;

    divImg.appendChild(img)
    divContainer.appendChild(divImg);

    const divButtons = document.createElement('div');
    divButtons.classList.add('gifButtonsContainer');

    divButtons.innerHTML = 
        `
            <button style="height: 33px;position: relative;top: -1px;" class="gifButton" >
                <img src="assets/icon-fav-hover.svg" alt="Favoritos" style="height: 15px;" class="gifButton-hover" id="${id}-fav">
            </button>
            <button class="gifButton" id="${id}-download">
                <img src="assets/icon-download.svg" alt="Descargar" style="height: 18px;" class="gifButton-hover">
            </button>
            <button class="gifButton" style="position: relative;top: -1px;">
                <img src="assets/icon-max.svg" alt="Maximizar" style="height: 16px;" class="gifButton-hover">
            </button>
        `;

      divContainer.appendChild(divButtons);

      const info = document.createElement('div');
      info.classList.add('infoGif');
      info.innerHTML = 
      `
        <p>${title}</p>
        <p>${username}</p>
      `
      
      divContainer.appendChild(info);

      gallery.appendChild(divContainer);

      document.getElementById(`${id}-fav`).parentElement.addEventListener('click', e => {
        agregarFav(this.datos);
      });
      document.getElementById(`${id}-download`).addEventListener('click', e => {
        fetch(url).then(res => res.blob())
        .then(response => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.setAttribute('download', `${title}.gif`);
          document.body.appendChild(link);
          link.click();
          link.parentElement.removeChild(link);
        })
      });
  }
}

