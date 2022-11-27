function criar_card_maquina() {
    var fkFilial = sessionStorage.FK_FILIAL;
    fetch(`/crud/listar_maquina/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                let id = [];
                let nome = [];
                let marca = [];
                let andar = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idMaquina);
                    nome.push(resposta[i].hostName);
                    marca.push(resposta[i].marcaMaquina);
                    andar.push(resposta[i].andarMaquina);

                }

                for (let i = 0; i < nome.length; i += 4) {
                    for (let k = 0; k < 5; k++) {

                        if (k == 4) {
                            divCrud.innerHTML +=
                                `
                                    <div class="break">
                                    </div>
                                `
                        } else {
                            if (id[i + k] != undefined) {
                                divCrud.innerHTML +=
                                    `
                                        <div class="card">
                                            <div class="infos" onclick="mostrar_modal_maquina(${id[i + k]})">
                                                <text>${nome[i + k]}</text>
                                                <text>${marca[i + k]}</text>
                                                <text>${andar[i + k]}° andar</text>
                                            </div>
                                            <div>
                                                <button class="botao-deletar" onclick="deletar_maquina(${id[i + k]})">Deletar<button/>
                                            </div>
                                        </div>
                                    `
                            }
                        }

                    }
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

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idUsuario);
                    nome.push(resposta[i].nomeUsuario);
                    cargo.push(resposta[i].cargo);

                }

                for (let i = 0; i < nome.length; i += 4) {
                    for (let k = 0; k < 5; k++) {

                        if (k == 4) {
                            divCrud.innerHTML +=
                                `
                                    <div class="break">
                                    </div>
                                `
                        } else {
                            if (id[i + k] != undefined) {
                                divCrud.innerHTML +=
                                    `
                                        <div class="card">
                                            <div class="infos" onclick="mostrar_modal_maquina(${id[i + k]})">
                                                <text>${nome[i + k]}</text>
                                                <text>${cargo[i + k]}</text>
                                            </div>
                                            <div>
                                                <button class="botao-deletar" onclick="deletar_maquina(${id[i + k]})">Deletar<button/>
                                            </div>
                                        </div>
                                    `
                            }
                        }

                    }
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
                let rua = [];
                let bairro = [];
                let cidade = [];
                let numEnd = [];
                let comple = [];
                let email = [];
                let cnpj = [];
                let senha = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idFilial);
                    cep.push(resposta[i].cepFilial);
                    rua.push(resposta[i].ruaFilial);
                    bairro.push(resposta[i].bairroFilial);
                    cidade.push(resposta[i].cidadeFilial);
                    numEnd.push(resposta[i].numeroEndFilial);
                    comple.push(resposta[i].complementoEnd);
                    email.push(resposta[i].emailFilial);
                    cnpj.push(resposta[i].cnpjFilial);
                    senha.push(resposta[i].senhaFilial);

                }

                for (let i = 0; i < cep.length; i++) {
                    divCrud.innerHTML += `
                        <div class="card" onclick="mostrar_modal_filial(${id[i]})">
                            ${id[i]}
                            ${cep[i]}
                            ${rua[i]}
                            ${bairro[i]}
                            ${cidade[i]}
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

function deletar_maquina(id) {
    fetch(`/crud/deletar_maquina/${id}`, {
        method: 'DELETE'
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.location.reload(false);
        } else {
            throw ("Houve um erro ao tentar realizar o update!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function deletar_funcionario(id) {
    fetch(`/crud/deletar_funcionario/${id}`, {
        method: 'DELETE'
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.location.reload(false);
        } else {
            throw ("Houve um erro ao tentar realizar o update!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}

function mostrar_modal_maquina(id) {

    let inputs = document.getElementsByName(`input`);
    inputs.disabled = true;

    let modal = document.querySelector('.modal')
    modal.style.display = 'flex';

    fetch(``).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                input_hostName.value = resposta[0].hostName;
                input_marca.value = resposta[0].marcaMaquina;
                input_so.value = resposta[0].sistemaOperacional;
                input_andar.value = resposta[0].andarMaquina;

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function mostrar_modal_funcionario(id) {

    let inputs = document.getElementsByName(`input`);
    inputs.disabled = true;

    let modal = document.querySelector('.modal')
    modal.style.display = 'flex';


    fetch(`/crud/informacoes_funcionario/${id}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                input_nomeUsuario.value = resposta[0].nomeUsuario;
                input_email.value = resposta[0].email;
                input_funcao.value = resposta[0].cargo;
                input_cpf.value = resposta[0].cpf;
                botao_alterar.setAttribute('onclick', `alterar_dados_funcionario(${id}, ${resposta[0].senha})`)

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function mostrar_modal_filial(id) {
    fetch(``).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));



            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function alterar_dados_funcionario(id, senha) {

    let senhas = document.getElementsByClassName('senhas');
    console.log(senhas[0].style.display == 'flex')
    if (senhas[0].style.display == 'flex') {
        if (input_senhaUsuario.value != senha) {
            return false;
        }
    }

    var nomeUsuarioVar = input_nomeUsuario.value;
    var cpfVar = input_cpf.value;
    var funcaoVar = input_funcao.value;
    var emailVar = input_email.value;
    var senhaUsuarioVar = senha;
    if (input_novaSenha.value != "") {
        senhaUsuarioVar = input_novaSenha.value;
    }

    // Enviando o valor da nova input
    fetch(`/crud/alterar_dados_funcionario`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js

            idServer: id,
            nomeUsuarioServer: nomeUsuarioVar,
            cpfServer: cpfVar,
            funcaoServer: funcaoVar,
            emailServer: emailVar,
            senhaUsuarioServer: senhaUsuarioVar,

        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            window.location.reload(false);
        } else {
            throw ("Houve um erro ao tentar realizar o update!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        // finalizarAguardar();
    });
}

function mostrar_input_senha(resposta) {
    let senhas = document.getElementsByClassName('senhas');
    let modal = document.querySelector('.modal')

    if (resposta) {
        for (let i = 0; i < senhas.length; i++) {
            senhas[i].style.display = 'flex';
        }
        modal.style.height = 550 + "px"
    } else {
        for (let i = 0; i < senhas.length; i++) {
            senhas[i].style.display = 'none';
        }
    }
}