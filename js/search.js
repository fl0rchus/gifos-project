//Variables
const searchInput = document.getElementById("search-input");
const searchInputNav = document.getElementById("search-input-nav");
const searchIconNav = document.getElementById("search-icon-nav");
const searchIcon2 = document.getElementById("search-icon");
const resultTitle = document.getElementById("result-title");
const noResultTitle = document.getElementById("no-results-title");
const resultSection = document.getElementById("results");
const btnVerMas = document.getElementById("btnVerMas");
const results = document.getElementById("results");
const noResults = document.getElementById('no-results');

let q;
let offset = 0;

//Busqueda de Navbar
searchIconNav.addEventListener("click", function (e) {
  e.preventDefault();
  q = searchInputNav.value;
  search(q);
});
//Busqueda
searchIcon2.addEventListener("click", function (e) {
  e.preventDefault();
  q = searchInput.value;
  search(q);
});
//Enter
searchInput.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (event.keyCode === 13) {
    q = searchInput.value;
    search(q);
  }
});
//Busqueda con los trendings
const trendingsUl = document.getElementById('trending-strings');
trendingsUl.addEventListener('click', (li) => {
    q = li.target.textContent;
    search(q);
});

const gallery = document.getElementById('gallery');

//Funcion de busqueda
async function search() {
    const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12&offset=${offset}`;
    const response = await fetch(searchPath);
    const json = await response.json();

    if (response.status !== 200) throw Error("Fetch error");

    gallery.innerHTML = '';
    resultTitle.textContent = q;
    btnVerMas.style.visibility = 'visible';
    results.style.display = 'block';


    if(json.data == 0){
        noResults.style.display = 'block';
        noResultTitle.textContent = q;
        results.style.display = 'none';
    }else{
        for (let i = 0; i < json.data.length; i++) {
            let data = json.data[i];
            new GifElement(data.images.downsized.url, data.title, data.username, data.id);
        }
        noResults.style.display = 'none';
    };
    
    console.log(json.data)

    desactiveSearchBar();
    clearSearch();
}

//Muestra de la busqueda en el DOM




const innerCardSearch = document.getElementById("inner-search");
const greyIcon = document.getElementById("search-icon-grey");
const closeIcon = document.getElementById("close-icon");

//Buscador activo
function activeSearchBar() {
  q = searchInput.value;

  //Cambio de estilos en el buscador
  innerCardSearch.style.display = "block";
  greyIcon.style.display = "block";
  closeIcon.style.display = "block";
  searchIcon2.style.display = "none";

  //Llamada a la API para traer las sugerencias
  if (q.length >= 1) {
    fetch(
      `https://api.giphy.com/v1/tags/related/${q}?api_key=${apiKey}&limit=4`
    )
      .then((response) => response.json())
      .then((data) => suggestions(data))
      .catch((error) => {
        console.error("Error: ", error);
      });
  } else {
    desactiveSearchBar();
  }
}

const suggestionsUl = document.getElementById("suggestions-ul");

//Dibujar las sugerencias en el DOM
function suggestions(data) {
  let sugerencia = data.data;
  //console.log(sugerencia);

  suggestionsUl.innerHTML = `
        <li><i class="fas fa-search"></i> ${sugerencia[0].name}</li>
        <li><i class="fas fa-search"></i> ${sugerencia[1].name}</li>
        <li><i class="fas fa-search"></i> ${sugerencia[2].name}</li>
        <li><i class="fas fa-search"></i> ${sugerencia[3].name}</li>
    `;
}

searchInput.addEventListener("keyup", activeSearchBar);

//Cerrar barra de busqueda
function desactiveSearchBar() {
  innerCardSearch.style.display = "none";
  greyIcon.style.display = "none";
  closeIcon.style.display = "none";
  searchIcon2.style.display = "block";
}

//Busqueda con sugerencia
suggestionsUl.addEventListener("click", (li) => {
  searchInput.value = li.target.textContent;
  search();
});

//Limpiar la busqueda
function clearSearch() {
  searchInput.value = "";
  searchInput.placeholder = "Busca GIFOS y más";
  innerCardSearch.style.display = "none";
  greyIcon.style.display = "none";
  closeIcon.style.display = "none";
  searchIcon2.style.display = "block";
}

closeIcon.addEventListener("click", clearSearch);

//Function de btn Ver Mas
btnVerMas.addEventListener("click", moreResults);

function moreResults() {
  offset = offset + 12;
  moreResultsGifs();
}

function moreResultsGifs() {
  event.preventDefault();
  const searchPath = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=12&offset=${offset}`;
  fetch(searchPath)
    .then(function (res) {
      return res.json();
    })
    .then(function (json) {
      for (let i = 0; i < json.data.length; i++) {
        new GifElement(json.data[i].images.downsized.url, json.data[i].title, json.data[i].username, json.data[i].id);
      }
    });
}