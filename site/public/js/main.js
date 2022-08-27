function turn_around(n) {
    switch (n) {
        case 1:
            foto1.style.backgroundColor = "red";

            break;
        case 2:
            foto2.style.backgroundColor = "red";
            break;
        case 3:
            foto3.style.backgroundColor = "red";
            break;
        case 4:
            foto4.style.backgroundColor = "red";
            break;
        case 5:
            foto5.style.backgroundColor = "red";
            break;
        case 6:
            foto6.style.backgroundColor = "red";
            break;
    }
}

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

/* div_pai.onclick = function(){
    localizar_setor(qtdSetor[c].idSetor)
  }; */

/*   var Foo = function(){
    document.getElementById( "a" ).setAttribute( "onClick", "javascript: Boo();" );
} */

/* document.getElementById("a").onclick = function () { Foo(param); }; */