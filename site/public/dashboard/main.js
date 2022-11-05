function criar_card() {
    var fkFilial = sessionStorage.FK_FILIAL;
    fetch(`/usuarios/listar_maquina/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var nome = []
                var total = []
                var disco = []
                var processador = []
                var ram = []

                var tempNome = []
                var tempTotal = []
                var tempDisco = []
                var tempProcessador = []
                var tempRam = []



                for (let i = 0; i < resposta.length; i += 3) {
                    var teste = Number(resposta[i].valorRegistro) + Number(resposta[i + 1].valorRegistro) +
                        Number(resposta[i + 2].valorRegistro);

                    tempNome.push(resposta[i].hostName)
                    tempTotal.push(teste)
                    tempDisco.push(resposta[i].valorRegistro)
                    tempProcessador.push(resposta[i + 1].valorRegistro)
                    tempRam.push(resposta[i + 2].valorRegistro)

                }

                var forTotal = tempTotal[0]
                var forNome = ''
                var forDisco = ''
                var forProcessador = ''
                var forRam = ''
                var index = 0

                while (tempNome.length != nome.length) {
                    for (let i = 0; i < tempNome.length; i++) {

                        if (forTotal < tempTotal[i]) {

                            forTotal = tempTotal[i]
                            forNome = tempNome[i]
                            forDisco = tempDisco[i]
                            forProcessador = tempProcessador[i]
                            forRam = tempRam[i]
                            index = i
                        }
                    }

                    nome.push(forNome)
                    total.push(forTotal)
                    disco.push(forDisco)
                    processador.push(forProcessador)
                    ram.push(forRam)

                    tempTotal[index] = -1
                    forTotal = -1


                }
                console.log(nome);
                console.log(total);
                console.log(disco);
                console.log(processador);
                console.log(ram);




                // var numArray = total;
                // numArray.sort(function (a, b) {
                //     return b - a;
                // });

                // console.log(numArray);








                for (let i = 0; i < nome.length; i++) {
                
                    /* var maquina = maquina da vez */
                    // var maquina = resposta[i];
                    var apontamento = document.getElementById("temporaria_apontamento");
                    var cardMaquina = document.createElement("div");
                    apontamento.appendChild(cardMaquina)
                    cardMaquina.className = 'div_maquina'

                    var nomeMaquina = document.createElement("div");
                    cardMaquina.appendChild(nomeMaquina)
                    nomeMaquina.setAttribute('class', `nome_maquina texto`)
                    nomeMaquina.setAttribute('onclick', `gerar_modal(1)`)
                    // precisa mudar o gerar_modal(1)!!!!!!!!!

                    var hover = document.createElement("div");
                    nomeMaquina.appendChild(hover)
                    hover.className = 'div_hover'
                    hover.innerHTML = nome[i]

                    var div_dado = document.createElement("div");
                    cardMaquina.appendChild(div_dado)
                    div_dado.className = 'dado'

                    var conjunto = document.createElement("div");
                    div_dado.appendChild(conjunto)
                    conjunto.className = 'conjunto'

                    var dado_disco = document.createElement("div");
                    conjunto.appendChild(dado_disco)
                    dado_disco.setAttribute('class', `dado_memoria texto`)
                    dado_disco.innerHTML = `Disco:${disco[i]}%`

                    var dado_processador = document.createElement("div");
                    conjunto.appendChild(dado_processador)
                    dado_processador.setAttribute('class', `dado_memoria texto`)
                    dado_processador.innerHTML = `Processador:${processador[i]}%`

                    var dado_memoria = document.createElement("div");
                    conjunto.appendChild(dado_memoria)
                    dado_memoria.setAttribute('class', `dado_memoria texto`)
                    dado_memoria.innerHTML = `Memória RAM:${ram[i]}%`

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

// function gerar_select(){
//     fetch("/usuarios/listar_andar").then(function (resposta) {



//     });



// }

function gerar_modal(idMaquina) {

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
function fechar_modal() {

}


// gerar_select();