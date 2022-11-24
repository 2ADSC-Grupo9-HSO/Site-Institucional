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

setInterval(() => {
    destruir_graficos();
    gerar_graficos();
    criar_card();
}, 5000)

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

    var varGraficoModal = document.getElementById("graficoModal")
    var divGraficoModal = document.getElementById("graficoMaquina")
    divGraficoModal.removeChild(varGraficoModal)
}

function gerar_modal(idMaquina) {

    let modal = document.querySelector('.modal')
    modal.style.display = 'flex';

    var fkFilial = sessionStorage.FK_FILIAL;

    fetch(`/usuarios/mostrar_dash/${idMaquina}&${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));
                nomeModalMaquina.innerHTML = resposta[0].nome.toUpperCase()
                infoRede.innerHTML = "Rede: <br>" + resposta[0].nomeRede.toUpperCase()
                infoAndar.innerHTML = "Andar: <br>" + resposta[0].andar + "º"
                infoMarca.innerHTML = "Marca: <br>" + resposta[0].marca.toUpperCase()
                infoSistema.innerHTML = "SO: <br>" + resposta[0].sistema.toUpperCase()

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

    div_pai.append(new_canva)

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
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                var div_pai = document.getElementById('grafico_atividade')

                var new_canva = document.createElement('canvas')
                new_canva.id = 'myChartAtividade'

                div_pai.append(new_canva)

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
                    }, {
                        label: 'Médicos',
                        backgroundColor: '#d303fc',
                        borderColor: '#d303fc',
                        data: tempMedic,
                    }, {
                        label: 'Totem',
                        backgroundColor: '#fc9403',
                        borderColor: '#fc9403',
                        data: tempTotem,
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
            maquina_tot_problema.innerHTML = 'Sem Máquinas com Problemas'
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}