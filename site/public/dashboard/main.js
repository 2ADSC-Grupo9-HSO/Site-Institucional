const { application } = require("express");

function gerar_graficos() {
    get_grafico_donut();
    get_grafico_stacked();
}

function destruir_graficos() {
    var div_pai1 = document.getElementById('grafico_donut')
    var div_pai2 = document.getElementById('grafico_atividade')

    var old_canva1 = document.getElementById('myChartDonut')
    var old_canva2 = document.getElementById('myChartAtividade')
    div_pai1.removeChild(old_canva1)
    div_pai2.removeChild(old_canva2)
}

function criar_card() {
    var fkFilial = sessionStorage.FK_FILIAL;
    temporaria_apontamento.innerHTML = ''
    fetch(`/usuarios/listar_maquina/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                var nome = []
                var total = []
                var disco = []
                var processador = []
                var ram = []
                var id = []

                var tempNome = []
                var tempTotal = []
                var tempDisco = []
                var tempProcessador = []
                var tempRam = []
                var tempId = []

                for (let i = 0; i < resposta.length; i += 3) {
                    var teste = Number(resposta[i].valorRegistro) + Number(resposta[i + 1].valorRegistro) + Number(resposta[i + 2].valorRegistro);

                    tempNome.push(resposta[i].hostName)
                    tempTotal.push(teste)
                    tempProcessador.push(resposta[i].valorRegistro)
                    tempRam.push(resposta[i + 1].valorRegistro)
                    tempDisco.push(resposta[i + 2].valorRegistro)
                    tempId.push(resposta[i].idMaquina)

                }

                var forTotal = tempTotal[0]
                var forNome = tempNome[0]
                var forDisco = tempDisco[0]
                var forProcessador = tempProcessador[0]
                var forRam = tempRam[0]
                var index = 0
                var forId = tempId[0]

                while (tempNome.length != nome.length) {
                    for (let i = 0; i < tempNome.length; i++) {

                        if (forTotal < tempTotal[i]) {

                            forTotal = tempTotal[i]
                            forNome = tempNome[i]
                            forDisco = tempDisco[i]
                            forProcessador = tempProcessador[i]
                            forRam = tempRam[i]
                            forId = tempId[i]
                            index = i

                        }
                    }

                    nome.push(forNome)
                    total.push(forTotal)
                    disco.push(forDisco)
                    processador.push(forProcessador)
                    ram.push(forRam)
                    id.push(forId)

                    tempTotal[index] = -1
                    forTotal = -1
                }

                for (let i = 0; i < nome.length; i++) {


                    // var maquina = resposta[i];
                    var apontamento = document.getElementById("temporaria_apontamento");
                    var cardMaquina = document.createElement("div");
                    apontamento.appendChild(cardMaquina)
                    cardMaquina.className = 'div_maquina'

                    var nomeMaquina = document.createElement("div");
                    cardMaquina.appendChild(nomeMaquina)
                    nomeMaquina.setAttribute('class', `nome_maquina texto`)
                    nomeMaquina.setAttribute('onclick', `gerar_modal(${id[i]})`)
                    // precisa mudar o gerar_modal(1)!!!!!!!!!

                    var hover = document.createElement("div");
                    nomeMaquina.appendChild(hover)
                    hover.className = 'div_hover'
                    hover.innerHTML = nome[i].toUpperCase()

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

function fecharModal() {
    let modal = document.querySelector('.modal')
    modal.style.display = 'none';
    clearTimeout(proximaAtualizacao)

    divBotaoMaquina.removeChild(botaoReiniciarMaquina)

    var varGraficoModal = document.getElementById("graficoModal")
    var divGraficoModal = document.getElementById("graficoMaquina")
    divGraficoModal.removeChild(varGraficoModal)
}

function gerar_modal(idMaquina) {

    let modal = document.querySelector('.modal')
    modal.style.display = 'flex';

    var fkFilial = sessionStorage.FK_FILIAL;

    fetch(`/usuarios/mostrar_dash/${idMaquina}&${fkFilial}`).then(function (resposta) {
        var isCreated = document.getElementById("botaoReiniciarMaquina")
        var divBotaoMaquina = document.getElementById("divBotaoMaquina")

        if (isCreated != null) {
            divBotaoMaquina.removeChild(isCreated)
        }

        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                nomeModalMaquina.innerHTML = resposta[0].nome.toUpperCase()
                infoRede.innerHTML = "Rede: <br>" + resposta[0].nomeRede.toUpperCase()
                infoAndar.innerHTML = "Andar: <br>" + resposta[0].andar + "º"
                infoMarca.innerHTML = "Marca: <br>" + resposta[0].marca.toUpperCase()
                infoSistema.innerHTML = "SO: <br>" + resposta[0].sistema.toUpperCase()

                var criarBotao = document.createElement("button")
                divBotaoMaquina.appendChild(criarBotao)
                criarBotao.id = "botaoReiniciarMaquina"
                criarBotao.innerHTML = "Reiniciar Máquina"
                criarBotao.setAttribute("onclick", `confirma_reinicio(${idMaquina})`)

                get_processos(idMaquina);

                setInterval(obterDadosGrafico(idMaquina), 5000)
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
};


function get_grafico_donut() {
    var fkFilial = sessionStorage.FK_FILIAL;

    var div_pai = document.getElementById('grafico_donut')

    var new_canva = document.createElement('canvas')
    new_canva.id = 'myChartDonut'

    div_pai.appendChild(new_canva)

    fetch(`/usuarios/get_grafico_donut/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                const labelsDonut = [
                    'Máquinas saudáveis',
                    'Máquinas debilitadas',
                ];

                var dataDonut = {
                    labels: labelsDonut,
                    datasets: [{
                        backgroundColor:
                            ['#44DDFF',
                                '#FF4343'],
                        borderColor:
                            ['#44DDFF',
                                '#FF4343'],
                        data: [Number(resposta[0].qtd_maquinas_total) - Number(resposta[0].qtd_maquinas_debilitadas), Number(resposta[0].qtd_maquinas_debilitadas)],
                    }]
                };

                var porcentagem = (Number(resposta[0].qtd_maquinas_debilitadas) * 100) / Number(resposta[0].qtd_maquinas_total)
                spanKpiAtual.innerHTML = porcentagem.toFixed(0) + "%"
                if (porcentagem >= 20) {
                    kpiAtual.style.borderColor = "#eb1e1e"
                } else if (porcentagem >= 10) {
                    kpiAtual.style.borderColor = "#eba31e"
                } else if (porcentagem >= 5) {
                    kpiAtual.style.borderColor = "#ebe81e"
                } else {
                    kpiAtual.style.borderColor = "#5feb1e"
                }

                const configDonut = {
                    type: 'doughnut',
                    data: dataDonut,
                    options: {}
                };

                const myChartDonut = new Chart(
                    document.getElementById('myChartDonut'),
                    configDonut
                );

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function get_grafico_stacked() {
    var fkFilial = sessionStorage.FK_FILIAL;


    fetch(`/usuarios/get_grafico_stacked/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            maquina_tot_problema.innerHTML = 'Maquinas Totais com Incidentes'
            
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                var div_pai = document.getElementById('grafico_atividade')

                var new_canva = document.createElement('canvas')
                new_canva.id = 'myChartAtividade'

                div_pai.appendChild(new_canva)

                var tempLabel = [];
                var auxLabel = [];
                var tempTotem = [];
                var tempRecep = [];
                var tempMedic = [];

                var tempAndar = resposta[0].andar;

                var am = false
                var ar = false
                var at = false

                for (let c = 0; c < resposta.length; c++) {

                    if (tempLabel[tempLabel.length - 1] != resposta[c].andar) {
                        tempLabel.push(resposta[c].andar);
                        auxLabel.push(resposta[c].andar + '° Andar');
                    }

                    /* if(tempAndar != resposta[c].andar) */

                    if (tempAndar != resposta[c].andar) {

                        if (!am) {
                            tempMedic.push(0)
                        }
                        if (!ar) {
                            tempRecep.push(0)
                        }
                        if (!at) {
                            tempTotem.push(0)
                        }

                        am = false;
                        ar = false;
                        at = false;

                        tempAndar = resposta[c].andar;

                    }

                    if (resposta[c].tipo == 'm' || resposta[c].tipo == 'M') {
                        tempMedic.push(resposta[c].qtd_total)
                        am = true;
                    }
                    else if (resposta[c].tipo == 'r' || resposta[c].tipo == 'R') {
                        tempRecep.push(resposta[c].qtd_total)
                        ar = true;
                    }
                    else if (resposta[c].tipo == 't' || resposta[c].tipo == 'T') {
                        tempTotem.push(resposta[c].qtd_total)
                        at = true
                    }

                }

                const labels = auxLabel;

                const data2 = {
                    labels: labels,
                    datasets: [{
                        label: 'Recepção',
                        backgroundColor: '#44DDFF',
                        borderColor: '#44DDFF',
                        data: tempRecep,
                        barThickness: 'flex',
                        maxBarThickness: 50,
                        minBarThickness: 50,
                    }, {
                        label: 'Médicos',
                        backgroundColor: '#d303fc',
                        borderColor: '#d303fc',
                        data: tempMedic,
                        barThickness: 'flex',
                        maxBarThickness: 50,
                        minBarThickness: 50,
                    }, {
                        label: 'Totem',
                        backgroundColor: '#fc9403',
                        borderColor: '#fc9403',
                        data: tempTotem,
                        barThickness: 'flex',
                        maxBarThickness: 50,
                        minBarThickness: 50,
                    }
                    ]
                };

                const config2 = {
                    type: 'bar',
                    data: data2,
                    options: {
                        responsive: true,
                        scales: {
                            x: {
                                stacked: true,
                            },
                            y: {
                                stacked: true
                            }
                        }
                    }
                };

                const myChart2 = new Chart(
                    document.getElementById('myChartAtividade'),
                    config2
                );

            });
        }
        if (resposta.status == 204) {
            var div_pai = document.getElementById('grafico_atividade')
            var div_filho = document.createElement('div')

            div_pai.appendChild(div_filho)

            div_filho.innerHTML = '<img class="foto_graf" src="../assets/icons/ok.png">'
            div_filho.id = 'myChartAtividade'
            div_filho.className = 'maquina_tot_pro'
            maquina_tot_problema.innerHTML = 'Sem Máquinas com Incidentes'
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function get_processos(fkMaquina) {

    var div_pai = document.getElementById("divListaProcesso")
    div_pai.innerHTML = ""

    fetch(`/usuarios/get_processos/${fkMaquina}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                for (let i = 0; i < resposta.length; i++) {
                    var div_processo = document.createElement("div")
                    var span_processo = document.createElement("div")
                    var image_processo = document.createElement("img")

                    div_pai.appendChild(div_processo)
                    div_processo.appendChild(span_processo)
                    div_processo.appendChild(image_processo)

                    image_processo.setAttribute("onclick", `matar_processo(${fkMaquina},${resposta[i].idProcesso})`)

                    div_processo.className = "processo_unitario"
                    span_processo.className = "span_processo_unitario"
                    image_processo.className = "image_processo_unitario"

                    span_processo.innerHTML = resposta[i].nomeProcesso
                    image_processo.src = "../assets/icons/exit.png"


                }
            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function matar_processo(fkMaquina, idProcesso) {
    fetch(`/usuarios/matar_processo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idProcessoServer: idProcesso,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
                get_processos(fkMaquina)

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function confirma_reinicio(fkMaquina) {
    Swal.fire({
        title: 'Você quer mesmo reiniciar esta máquina?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Reiniciar Maquina',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire('Reiniciando Máquina!', '', 'Concluido')
            reiniciar_maquina(fkMaquina)
        } else if (result.isDenied) {
            Swal.fire('Operação cancelada', '', '')
        }
    })
}

function reiniciar_maquina(fkMaquina) {
    fetch(`/usuarios/reiniciar_maquina`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            fkMaquinaServer: fkMaquina,
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            get_processos(fkMaquina)

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}