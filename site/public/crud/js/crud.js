function criar_card_maquina() {
    var fkFilial = sessionStorage.FK_FILIAL;
    fetch(`/crud/listar_maquina/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                let id = [];
                let nome = [];
                let marca = [];
                let sistema = [];
                let andar = [];
                let senha = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idMaquina);
                    nome.push(resposta[i].hostName);
                    marca.push(resposta[i].marcaMaquina);
                    sistema.push(resposta[i].sistemaOperacional);
                    andar.push(resposta[i].andarMaquina);
                    senha.push(resposta[i].senhaMaquina);

                }

                for (let i = 0; i < nome.length; i++) {
                    divCrud.innerHTML += `
                        <div class="cardMaquinaWww">
                            ${id[i]}
                            ${nome[i]}
                            ${marca[i]}
                            ${sistema[i]}
                            ${andar[i]}
                            ${senha[i]}
                        </div>
                    `
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}

function criar_card_funcionario() {
    var idFilial = sessionStorage.FK_FILIAL;
    fetch(`/crud/listar_funcionario/${idFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                let id = [];
                let nome = [];
                let cargo = [];
                let email = [];
                let cpf = [];
                let senha = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idUsuario);
                    nome.push(resposta[i].nomeUsuario);
                    cargo.push(resposta[i].cargo);
                    email.push(resposta[i].email);
                    cpf.push(resposta[i].cpf);
                    senha.push(resposta[i].senha);

                }

                for (let i = 0; i < nome.length; i++) {
                    divCrud.innerHTML += `
                        <div class="cardMaquinaWww">
                            ${id[i]}
                            ${nome[i]}
                            ${cargo[i]}
                            ${email[i]}
                            ${cpf[i]}
                            ${senha[i]}
                        </div>
                    `
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}

function criar_card_filial() {
    var idRede = sessionStorage.FK_REDE;
    fetch(`/crud/listar_filial/${idRede}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                let id = [];
                let cep = [];
                let numEnd = [];
                let comple = [];
                let email = [];
                let cnpj = [];
                let senha = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idFilial);
                    cep.push(resposta[i].cepFilial);
                    numEnd.push(resposta[i].numeroEndFilial);
                    comple.push(resposta[i].complementoEnd);
                    email.push(resposta[i].emailFilial);
                    cnpj.push(resposta[i].cnpjFilial);
                    senha.push(resposta[i].senhaFilial);

                }

                for (let i = 0; i < cep.length; i++) {
                    divCrud.innerHTML += `
                        <div class="cardMaquinaWww">
                            ${id[i]}
                            ${cep[i]}
                            ${numEnd[i]}
                            ${comple[i]}
                            ${email[i]}
                            ${cnpj[i]}
                            ${senha[i]}
                        </div>
                    `
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}