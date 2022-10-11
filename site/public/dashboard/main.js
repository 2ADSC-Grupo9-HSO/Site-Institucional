function criar_card() {

    fetch("/usuarios/listar_maquina").then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                for (let i = 0; i < resposta.length; i++) {
                    /* var maquina = maquina da vez */
                    var maquina = resposta[i];
                    var apontamento = document.getElementById("temporaria_apontamento");
                    var cardMaquina = document.createElement("div");
                    apontamento.appendChild(cardMaquina)
                    cardMaquina.className = 'div_maquina'

                    var nomeMaquina = document.createElement("div");
                    cardMaquina.appendChild(nomeMaquina)
                    nomeMaquina.setAttribute('class', `nome_maquina texto`)
                    nomeMaquina.setAttribute('onclick', `gerar_modal(${maquina.id})`)

                    var hover = document.createElement("div");
                    nomeMaquina.appendChild(hover)
                    hover.className = 'div_hover'
                    hover.innerHTML= maquina.nome

                    var div_dado = document.createElement("div");
                    cardMaquina.appendChild(div_dado)
                    div_dado.className = 'dado'

                    var conjunto = document.createElement("div");
                    div_dado.appendChild(conjunto)
                    conjunto.className = 'conjunto'

                    var dado_memoria = document.createElement("div");
                    conjunto.appendChild(dado_memoria)
                    dado_memoria.setAttribute('class', `dado_memoria texto`)
                    dado_memoria.innerHTML = `Memória RAM:${maquina.ram}%`


                    var dado_processador = document.createElement("div");
                    conjunto.appendChild(dado_processador)
                    dado_processador.setAttribute('class', `dado_memoria texto`)
                    dado_processador.innerHTML = `Processador:${maquina.processador}%`

                    var dado_disco = document.createElement("div");
                    conjunto.appendChild(dado_disco)
                    dado_disco.setAttribute('class', `dado_memoria texto`)
                    dado_disco.innerHTML = `Disco:${maquina.disco}%`


                    var espacamento = document.createElement("div");
                    div_dado.appendChild(espacamento)
                    espacamento.className = 'espacamento'

}


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}

function gerar_select(){
    fetch("/usuarios/listar_andar").then(function (resposta) {



    });



}

function gerar_modal(idMaquina){

    let modal = document.querySelector('.modal')
        modal.style.display = 'block';

    
        fetch(`/usuarios/mostrar_dash/${idMaquina}`).then(function (resposta) {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));
                    var btn_fechar = document.createElement("div");
                    modal.appendChild(btn_fechar)
                    btn_fechar.setAttribute('class', `sair_modal texto`)
                    btn_fechar.innerHTML = `Fechar`
                    
    
                    
                });
            } else {
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    };
    function fechar_modal(){

    }


criar_card();
gerar_select();