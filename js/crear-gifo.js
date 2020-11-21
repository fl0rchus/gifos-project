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
            ventanaVideo.srcObject = stream;
            ventanaVideo.play();

            document.getElementById("btn-grabar").style.display = "flex";

            
        });
    });

    document.getElementById("btn-grabar").addEventListener("click", e => {
        recorder = new GifRecorder(videoStream, {
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
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
        document.getElementById("loading").style.display = "block";
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
                document.getElementById("uploaded").style.display = "block";
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