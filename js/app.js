const searchIcon = document.getElementById("search-icon");

//Dark Mode
const btnSwitch = document.getElementById("switch");
const logo = document.querySelector(".logo");
btnSwitch.addEventListener("click", () => {
  btnSwitch.textContent = "MODO DIURNO";
  document.body.classList.toggle("dark");
  logo.src = "../assets/logo-desktop-modo-noc.svg";

  if (document.body.classList == "") {
    logo.src = "../assets/logo-desktop.svg";
    btnSwitch.textContent = "MODO NOCTURNO";
  }
});

//Trending strings
async function trendingStrings2() {
  //Leer json
  let response = await fetch(urlTrending);
  let data = await response.json();
  //Mostrar resultados
  let container = document.getElementById("trending-strings");
  for (let i = 0; i < 5; i++) {
    let result = data.data[i];
    container.innerHTML += `<li>${result}</li>`;
  }
  // console.log(data);
}
trendingStrings2();
