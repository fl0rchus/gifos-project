//Variables
const navSearch = document.getElementById('nav-search');
const shadow = document.getElementById('header');
const plus = document.getElementById('plus');

//SCROLL 
window.addEventListener('DOMContentLoaded', () =>{
    shadow.classList.remove('shadow');
})
window.addEventListener('scroll', () => {
    const scrollPX = window.scrollY;
     if(scrollPX > 20){
         navSearch.style.visibility = 'visible';
         shadow.classList.add('shadow');
         plus.style.visibility = 'hidden'; 
     }else{
        navSearch.style.visibility = 'hidden';
        plus.style.visibility = 'visible';
        shadow.classList.remove('shadow');
     }
});
