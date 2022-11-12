let desbloqueado = true;

function abrir_menu() {

    if (desbloqueado) {
        opcoes_menu.style.display = "flex";
        opcoes_menu.style.position = "fixed";
        opcoes_menu.style.position = "fixed";
        id_navbar.style.backgroundColor = "#FFFFFF"
        desbloqueado = false;

    } else if (!desbloqueado) {
        id_navbar.style.backgroundColor = "#FFFFFF"
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