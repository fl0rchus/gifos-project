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


window.onload = () => {
    const step1 = document.getElementById("step-1");
    const step1n = step1.firstElementChild;
    const step2 = document.getElementById("step-2");
    const step2n = step2.firstElementChild;
    const step3 = document.getElementById("step-3");
    const step3n = step3.firstElementChild;

    const title = document.getElementById("container-title");
    const paragraph = document.getElementById("container-paragraph");

    document.getElementById("btn-create").addEventListener("click", e => {
        title.innerHTML = `
            Nos das acceso a tu camara?
        `;
        paragraph.innerHTML = `
            El acceso a tu camara sera valido solo
            <br/>
            por el tiempo en el que estes creando el GIFO.
        `;

        document.getElementById("btn-create").style.display = "none";
        step1.style.backgroundColor = "#572ee5";
        step1n.style.color = "#fff";

        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 320 },
                width: { max: 480 }
            }
        }).then(stream => {
            videoStream = stream;
            title.style.display = "none";
            paragraph.style.display = " none";
            document.querySelector(".video").style.display = "flex";
            ventanaVideo.srcObject = stream;
            ventanaVideo.play();

            document.getElementById("btn-grabar").style.display = "flex";

            
        });
    });

    document.getElementById("btn-grabar").addEventListener("click", e => {
        recorder = new GifRecorder(videoStream, {
            frameRate: 1,
            quality: 10,
            width: 480,
            hidden: 320,
            onGifRecordingStarted: () => {
                step2.style.backgroundColor = "#572ee5";
                step2n.style.color = "#fff";
                step1.style.backgroundColor = "#fff";
                step1n.style.color = "#572ee5";
                document.getElementById("btn-grabar").style.display = "none";
                document.getElementById("btn-stop").style.display = "flex";

                document.getElementById("repetir-captura").style.display = "none";
                startTimer();
            }
        });
        recorder.record();
    });

    document.getElementById("btn-stop").addEventListener("click", e => {
        recorder.stop(blob => {
            ventanaVideo.style.display = "none";
            ventanaGif.style.display = "block";
            ventanaGif.src = URL.createObjectURL(blob);

            step2.style.backgroundColor = "#fff";
            step2n.style.color = "#572ee5";
            step3.style.backgroundColor = "#572ee5";
            step3n.style.color = "#fff";
            document.getElementById("btn-stop").style.display = "none";
            document.getElementById("btn-subir").style.display = "flex";
            gifCreado = blob;

            document.getElementById("repetir-captura").style.display = "block";
            stopTimer();
        });
    });

    document.getElementById("btn-subir").addEventListener("click", e => {
        document.getElementById("btn-subir").style.display = "none";
        document.getElementById("loading").style.display = "flex";
        ventanaGif.classList.add("salame");
        //ventanaGif.style.position = "relative";
        //ventanaGif.style.top = "-20px";
        document.querySelector(".video").style.backgroundColor = "#572ee5";
        let form = new FormData();
        form.append('file', gifCreado, 'myGif.gif');
        form.append('api_key', apiKey);
        const url = `https://upload.giphy.com/v1/gifs?api_key=${apiKey}`;
        fetch(url, {
            method: 'POST',
            body: form
        }).then(res => res.json())
        .then(response => {
            if(response.meta.msg == "OK" && response.meta.status == 200){
                document.getElementById("loading").style.display = "none";
                document.getElementById("uploaded").style.display = "flex";

                if(localStorage.getItem("misGifs")){
                    //agregarlo al storage actual
                    let gifs = JSON.parse(localStorage.getItem("misGifs"));
                    gifs.push(response.data.id);
                    localStorage.setItem("misGifs", JSON.stringify(gifs));
                }else{
                    //Crear el storage de 0
                    let gifs = [];
                    gifs.push(response.data.id);
                    localStorage.setItem("misGifs", JSON.stringify(gifs));
                }

                document.getElementById("btn-copiar").style.display = "flex";
                document.getElementById("btn-copiar").addEventListener("click", e => {
                    let aux = document.createElement("input");
                    aux.setAttribute("value", `https://giphy.com/gifs/${response.data.id}`);
                    document.body.appendChild(aux);
                    aux.select();
                    document.execCommand("copy");
                    document.body.removeChild(aux);
                });
                document.getElementById("btn-descargar").style.display = "flex";
                document.getElementById("btn-descargar").addEventListener("click", e => {
                    const url = `https://media0.giphy.com/media/${response.data.id}/giphy.gif?cid=d7aada5df75d06419f07e1f7704c5541038d923741b84029&rid=giphy.gif`
                    fetch(url).then(res => res.blob())
                    .then(response => {
                        const link = document.createElement("a");
                        link.href = window.URL.createObjectURL(new Blob([response]));
                        link.setAttribute("download", "myGif.gif");
                        document.body.appendChild(link);
                        link.click();
                        link.parentElement.removeChild(link);
                    });
                });
            }
        });
    });

    document.getElementById("repetir-captura").addEventListener("click", e => {
        location.reload();
    });
};

let ventanaVideo = document.getElementById("ventana-video");
let ventanaGif = document.getElementById("ventana-gif");
let recorder;
let videoStream;

let gifCreado;

let timerInterval;

function startTimer() {
    let timer = document.getElementById("timer");
    let seconds = 0;
    let minutes = 0;

    timerInterval = setInterval(() => {
        seconds++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }

        timer.innerText = `${(minutes < 10) ? `0${minutes}` : minutes} : ${(seconds < 10) ? `0${seconds}` : seconds}`;

        if(((minutes * 60) + seconds) == MAX_TIME) document.getElementById("btn-stop").click();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}