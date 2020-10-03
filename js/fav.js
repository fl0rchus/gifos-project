//Dark Mode
const btnSwitch = document.querySelector('#switch');
const logo = document.querySelector('#logo');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    logo.src = '../assets/logo-desktop-modo-noc.svg';
    btnSwitch.textContent = 'MODO DIURNO';
    if(document.body.classList == ''){
        logo.src = '../assets/logo-desktop.svg';
        btnSwitch.textContent = 'MODO NOCTURNO';
    }
});
