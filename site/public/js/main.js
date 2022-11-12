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

function change_screen(n) {
    switch (n) {
        case 1:
            window.location = "#sec_sobre"
            break;
        case 2:
            window.location = "#sec_empresa"
    }
}
