//Dark Mode
const btnSwitch = document.querySelector("#switch");
const logo = document.querySelector(".logo");
btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  logo.src = "../assets/logo-desktop-modo-noc.svg";
  btnSwitch.textContent = "MODO DIURNO";
  if (document.body.classList == "") {
    logo.src = "../assets/logo-desktop.svg";
    btnSwitch.textContent = "MODO NOCTURNO";
  }
});

window.onload = () => {
  if(localStorage.getItem("misGifs")) {
    //existe
    let gifs = JSON.parse(localStorage.getItem("misGifs"));
    if(gifs.length > 0){
      document.getElementById("no-gifos").style.display = "none";
      document.getElementById("gifos").style.display = "block";

      gifs.forEach(element => {
        const urlGif = `https://api.giphy.com/v1/gifs/${element}?api_key=${apiKey}`;
        
        fetch(urlGif).then(res => res.json())
        .then(response => {
          new GifElement(response.data.images.downsized.url,
            response.data.title,
            response.data.username,
            response.data.id
          );
        });
      });
    }
  }
};