const slides = document.querySelectorAll('[data-js="slide_item"]');
const botaoProximo = document.querySelector('[data-js="slide_button-next"]');
const botaoAnterior = document.querySelector('[data-js="slide_button-prev"]');

let slideAtual = 0;
const ultimoSlide = slides.length - 1;

const manipuladorDeClasses = slideCorreto => {
    slides.forEach(slide => {
        slide.classList.remove('slide_item-visible');
    });

    slides[slideCorreto].classList.add('slide_item-visible');
}

botaoProximo.addEventListener('click', () => {
    const slideCorreto = slideAtual === ultimoSlide
        ? slideAtual = 0
        : ++slideAtual

    manipuladorDeClasses(slideCorreto);
})

botaoAnterior.addEventListener('click', () => {
    const slideCorreto = slideAtual === 0
        ? slideAtual = ultimoSlide
        : --slideAtual

    manipuladorDeClasses(slideCorreto);
})

// Parte do samuel ........................................................
let desbloqueado = true;

function abrir_menu() {

    if (desbloqueado) {
        opcoes_menu.style.display = "flex";
        opcoes_menu.style.position = "fixed";
        opcoes_menu.style.position = "fixed";
        id_navbar.style.backgroundColor = " white"
        id_navbar.style.borderBottom = "solid 2px #858585"
        desbloqueado = false;

    } else if (!desbloqueado) {
        id_navbar.style.backgroundColor = "#000000C7"
        id_navbar.style.borderBottom = "none"
        opcoes_menu.style.display = "none";
        desbloqueado = true;
    }

}

window.addEventListener('resize', resizeHandler);

resizeHandler();

function resizeHandler(){
    const tela = window.innerWidth;
    if(tela > 600){
        desbloqueado = false;
        abrir_menu();
    }
}

function change_screen(n) {
    switch (n) {
        case 1:
            window.location = "#sec_sobre"
            break;
        case 2:
            window.location = "#sec_empresa"
    }
}
