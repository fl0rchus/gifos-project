const urlTrending = 'https://api.giphy.com/v1/trending/searches?api_key=oli7GG66WQdFAfoCYtCsWyE4HFqiOSdr&limit=5';
const apiKey = 'oli7GG66WQdFAfoCYtCsWyE4HFqiOSdr';

fetch(urlTrending)
    .then(response => response.json())
    .then(data => {
        let resultados = document.getElementById('resultado');
        resultados.innerHTML = `<p>${data.data.splice(0, 5)}</p>`
        console.log(data);
    })

    .cath(err => console.log(err));


