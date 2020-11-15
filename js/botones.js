// //Funcionalidad de btn Favoritos
function agregarFav(datos) {
  let heart;
  if(document.getElementById(`${datos.id}-fav`)) heart = document.getElementById(`${datos.id}-fav`);
  else if(document.getElementById(`${datos.id}-favtrend`)) heart = document.getElementById(`${datos.id}-favtrend`);
  else heart = document.getElementById(`${datos.id}-favmax`)

  var favList = localStorage.getItem("gifsFavs");

  if (favList) {
    favList = JSON.parse(favList);

    let flag = false;
    for (var i = 0; i < favList.length; i++) {
      if (favList[i].id == datos.id) {
        flag = true;
        break;
      }
    }

    if (flag) {
      //Sacarlo del localstorage
      favList.splice(i, 1);
      localStorage.setItem("gifsFavs", JSON.stringify(favList));
      heart.classList.remove("fav-active");
    } else {
      //agregarlo al localstorage
      favList.push(datos);
      localStorage.setItem("gifsFavs", JSON.stringify(favList));
      heart.classList.add("fav-active");
    }
  } else {
    //Crear el localstorage con el item como primero
    let favList = [];
    favList.push(datos);
    localStorage.setItem("gifsFavs", JSON.stringify(favList));

    //Poner el corazon
    heart.classList.add("fav-active");
  }
}

class GifElement {
  constructor(url, title, username, id) {
    this.datos = {
      url: url,
      title: title,
      username: username,
      id: id,
    };
    this.crearElemento(url, title, username, id);
  }

  crearElemento(url, title, username, id) {
    const divContainer = document.createElement("div");
    divContainer.classList.add("divResult");

    const divImg = document.createElement("div");
    divImg.classList.add("gifImg");

    const img = document.createElement("img");
    img.src = url;

    divImg.appendChild(img);
    divContainer.appendChild(divImg);

    const divButtons = document.createElement("div");
    divButtons.classList.add("gifButtonsContainer");

    divButtons.innerHTML = `
            <button style="height: 33px;position: relative;top: -1px;" class="gifButton" >
                <img src="assets/icon-fav-hover.svg" alt="Favoritos" style="height: 15px;" class="gifButton-hover" id="${id}-fav">
            </button>
            <button class="gifButton" id="${id}-download">
                <img src="assets/icon-download.svg" alt="Descargar" style="height: 18px;" class="gifButton-hover">
            </button>
            <button class="gifButton" style="position: relative;top: -1px;" id=${id}-max>
                <img src="assets/icon-max.svg" alt="Maximizar" style="height: 16px;" class="gifButton-hover">
            </button>
        `;

    divContainer.appendChild(divButtons);

    const info = document.createElement("div");
    info.classList.add("infoGif");
    info.innerHTML = `
        <p>${title}</p>
        <p>${username}</p>
      `;

    divContainer.appendChild(info);

    gallery.appendChild(divContainer);

    document
      .getElementById(`${id}-fav`)
      .parentElement.addEventListener("click", (e) => {
        agregarFav(this.datos);
      });
    document.getElementById(`${id}-download`).addEventListener("click", (e) => {
      fetch(url)
        .then((res) => res.blob())
        .then((response) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.setAttribute("download", `${title}.gif`);
          document.body.appendChild(link);
          link.click();
          link.parentElement.removeChild(link);
        });
    });
    document.getElementById(`${id}-max`).addEventListener("click", (e) => {
      searchById(id);
    });
  }
}
//Funcionalidad del boton maximizar
const modal = document.getElementById("modal");

async function searchById(id) {
  const urlGif = `https://api.giphy.com/v1/gifs/${id}?api_key=${apiKey}`;
  const response = await fetch(urlGif);
  const json = await response.json();

  maxGif(json);
}

async function maxGif(json) {
  let template = "";
  const url = json.data.images.fixed_width.url;

  template += `

  <div class="grid-container">
  <div class="max-gif">
    <div class="max-gif-img">
      <img src="${url}" alt="${json.data.title}" />
    </div>
  </div>
  <div class="max-info">
    <div class="max-info-p">
      <p class="max-user">${json.data.username}</p>
      <br>
      <p class="max-title">${json.data.title}</p>
    </div>
    <div class="max-info-btns">
    <button class="max-buttonGifs">
    <img
      src="assets/icon-fav-hover.svg"
      alt="Favoritos"
      class="gifButton-hover heart" id="${json.data.id}-favmax"
    />
  </button>
  <button class="max-buttonGifs download" id="${json.data.id}-downloadmax">
    <img
      src="assets/icon-download.svg"
      alt="Descargar"
      class="gifButton-hover "
    />
  </button>
    </div>
  </div>
  <div class="max-cross">
    <img
    src="assets/button-close.svg"
    alt="Close"
    onClick="closeModal()"
    class="btn-close-max"
  />
  </div>
</div>
  `;
  modal.innerHTML = template;
  modal.style.display = "block";

  document
    .getElementById(`${json.data.id}-favmax`)
    .parentElement.addEventListener("click", (e) => {
      const data = {
        id: json.data.id,
        title: json.data.title,
        url: json.data.images.downsized.url,
        username: json.data.username
      }
      
      agregarFav(data);
    });
  document
    .getElementById(`${json.data.id}-downloadmax`)
    .addEventListener("click", (e) => {
      fetch(url)
        .then((res) => res.blob())
        .then((response) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.setAttribute("download", `${title}.gif`);
          document.body.appendChild(link);
          link.click();
          link.parentElement.removeChild(link);
        });
    });
}

function closeModal() {
  modal.style.display = "none";
}
