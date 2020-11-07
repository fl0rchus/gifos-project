// //Funcionalidad de btn Favoritos
// const gif = document.getElementsByClassName('gif');

var favList = [];
if(localStorage.getItem('gifInfo' != null){
  favList = JSON.parse(localStorage.getItem('gifInfo'));
});


function favInfo(url, title, username, id){
    
    var info = {
        title: title,
        user: username,
        url: url
    }

    let  btnHeart = document.getElementById(`${id}-add`);
    let heart = btnHeart.firstElementChild;

    if (!heart.classList.contains("fav-active")) {
      heart.classList.add("fav-active");
      localStorage.setItem('gifInfo', JSON.stringify(favList));
    } else {
      heart.classList.remove("fav-active");
      let gif = document.getElementById(`${id}-gif`);
        let data = JSON.parse(localStorage.getItem('gifInfo'));
        data.forEach((item, index) => item === gif) ? data.splice(index,1) : null;
        console.log(data);
    }

    
    



    // console.log(heart);


    favList.push(info);
    // console.log(favList);

    // localStorage.setItem('gifInfo', JSON.stringify(favList));
}

