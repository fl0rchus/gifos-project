//Slider
const slider = document.getElementById("slider");
const prevSlider = document.getElementById("prev");
const nextSlider = document.getElementById("next");

nextSlider.addEventListener("click", (e) => {
  slider.scrollBy(357, 0);
});

prevSlider.addEventListener("click", (e) => {
  slider.scrollBy(-357, 0);
});

//Gifs Slider
async function trendingGifs() {
  //Leer json
  let response = await fetch(urlTrendingGifs);
  let data = await response.json();
  //Mostrar resultados
  for (let i = 0; i <= 15; i++) {
    let result = data.data[i].images.fixed_height.url;

    const divContainer = document.createElement("div");
    divContainer.classList.add("gif-card");
    divContainer.setAttribute("id", `${data.data[i].id}-gif`);

    const divGif = document.createElement("div");
    divGif.classList.add("gif");
    // divGif.setAttribute("id", `${data.data[i].id}-gif`);

    const img = document.createElement("img");
    img.src = result;
    img.classList.add("gif-img");

    divGif.appendChild(img);
    divContainer.appendChild(divGif);

    const divButtons = document.createElement("div");
    divButtons.classList.add("gif-buttons");

    // onclick="addFav(${data.data[i].id})"
    let datos = {
      url: data.data[i].images.downsized.url,
      title: data.data[i].title,
      username: data.data[i].username,
      id: data.data[i].id,
    };

    divButtons.innerHTML = `
            <button style="height: 33px;position: relative;top: -1px;" class="buttonGifs"  >
                <img src="assets/icon-fav-hover.svg" alt="Favoritos" style="height: 15px;" class="gifButton-hover heart" id="${data.data[i].id}-favtrend">
            </button>
            <button class="buttonGifs download" id="${data.data[i].id}-download">
                <img src="assets/icon-download.svg" alt="Descargar" style="height: 18px;" class="gifButton-hover">
            </button>
            <button class="buttonGifs max" style="position: relative;top: -1px;" id="${data.data[i].id}-max">
                <img src="assets/icon-max.svg" alt="Maximizar" style="height: 16px;" class="gifButton-hover">
            </button>
        `;

    divContainer.appendChild(divButtons);

    const divInfo = document.createElement("div");
    divInfo.classList.add("gif-info");
    divInfo.innerHTML = `
            <p class="gif-title">${data.data[i].username}</p>
            <p class="gif-username">${data.data[i].title}</p>
        `;

    divContainer.appendChild(divInfo);

    slider.appendChild(divContainer);

    document
      .getElementById(`${data.data[i].id}-favtrend`)
      .parentElement.addEventListener("click", (e) => {
        agregarFav(datos);
      });

    document
      .getElementById(`${data.data[i].id}-download`)
      .addEventListener("click", (e) => {
        fetch(datos.url)
          .then((res) => res.blob())
          .then((response) => {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(new Blob([response]));
            link.setAttribute("download", `${datos.title}.gif`);
            document.body.appendChild(link);
            link.click();
            link.parentElement.removeChild(link);
          });
      });
    document
      .getElementById(`${data.data[i].id}-max`)
      .addEventListener("click", (e) => {
        searchById(`${data.data[i].id}`);
      });

    checkFavs(data.data[i].id);

    const gifCard = document.getElementById(`${data.data[i].id}-gif`);

    gifCard.addEventListener("click", function () {
      if (isMobile()) {
        searchById(data.data[i].id);
      }
    });
  }
}
trendingGifs();
