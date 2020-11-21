//Dark Mode
const btnSwitch = document.querySelector("#switch");
const logo = document.querySelector(".logo");
const img1 = document.querySelector(".img-1 img");
const img2 = document.querySelector(".img-2 img");
btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  logo.src = "../assets/logo-desktop-modo-noc.svg";
  btnSwitch.textContent = "MODO DIURNO";
  img1.src = "../assets/camara-modo-noc.svg";
  img2.src = "../assets/pelicula-modo-noc.svg";
  if (document.body.classList == "") {
    logo.src = "../assets/logo-desktop.svg";
    btnSwitch.textContent = "MODO NOCTURNO";
    img1.src = "../assets/camara.svg";
    img2.src = "../assets/pelicula.svg";
  }
});
