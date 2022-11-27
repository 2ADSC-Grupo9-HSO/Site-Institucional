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
                                            <div class="infos" onclick="mostrar_modal_funcionario(${id[i + k]})">
                                                <text>${nome[i + k]}</text>
                                                <text>${cargo[i + k]}</text>
                                            </div>
                                            <div>
                                                <button class="botao-deletar" onclick="deletar_funcionario(${id[i + k]})">Deletar<button/>
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
                let cnpj = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idFilial);
                    cep.push(resposta[i].cepFilial);
                    cnpj.push(resposta[i].cnpjFilial);
                }

                for (let i = 0; i < cep.length; i += 4) {
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
                                            <div class="infos" onclick="mostrar_modal_filial(${id[i + k]})">
                                                <text>${cep[i + k]}</text>
                                                <text>${cnpj[i + k]}</text>
                                            </div>
                                            <div>
                                                <button class="botao-deletar" onclick="deletar_filial(${id[i + k]})">Deletar<button/>
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

function deletar_filial(id) {
    fetch(`/crud/deletar_filial/${id}`, {
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

    fetch(`/crud/informacoes_maquina/${id}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                input_hostName.value = resposta[0].hostName;
                input_marca.value = resposta[0].marcaMaquina;
                input_so.value = resposta[0].sistemaOperacional;
                input_andar.value = resposta[0].andarMaquina;
                botao_alterar.setAttribute('onclick', `alterar_dados_maquina(${id}, "${resposta[0].senhaMaquina}")`)

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
                botao_alterar.setAttribute('onclick', `alterar_dados_funcionario(${id}, "${resposta[0].senha}")`)

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function mostrar_modal_filial(id) {

    let inputs = document.getElementsByName(`input`);
    inputs.disabled = true;

    let modal = document.querySelector('.modal')
    modal.style.display = 'flex';

    fetch(`/crud/informacoes_filial/${id}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));

                input_emailFilial.value = resposta[0].emailFilial;
                input_cnpj.value = resposta[0].cnpjFilial;
                input_cep.value = resposta[0].cepFilial;
                input_numero.value = resposta[0].numeroEndFilial;
                input_complemento.value = resposta[0].complementoEnd;
                botao_alterar.setAttribute('onclick', `alterar_dados_filial(${id}, "${resposta[0].senhaFilial}")`)

            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function alterar_dados_maquina(id, senha) {

    let senhas = document.getElementsByClassName('senhas');
    console.log(senhas[0].style.display == 'flex')
    if (senhas[0].style.display == 'flex') {
        if (input_senha.value != senha) {
            return false;
        }
    }

    var hostNameVar = input_hostName.value;
    var marcaVar = input_marca.value;
    var soVar = input_so.value;
    var andarVar = input_andar.value;
    var senhaVar = senha;
    if (input_novaSenha.value != "") {
        senhaVar = input_novaSenha.value;
    }

    // Enviando o valor da nova input
    fetch(`/crud/alterar_dados_maquina`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js

            idServer: id,
            hostNameServer: hostNameVar,
            marcaServer: marcaVar,
            soServer: soVar,
            andarServer: andarVar,
            senhaServer: senhaVar,

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

function alterar_dados_filial(id, senha) {

    let senhas = document.getElementsByClassName('senhas');
    console.log(senhas[0].style.display == 'flex')
    if (senhas[0].style.display == 'flex') {
        if (input_senha.value != senha) {
            return false;
        }
    }

    var cepVar = input_cep.value;
    var numeroVar = input_numero.value;
    var complementoVar = input_complemento.value;
    var emailFilialVar = input_emailFilial.value;
    var cnpjVar = input_cnpj.value;
    var senhaVar = senha;
    if (input_novaSenha.value != "") {
        senhaVar = input_novaSenha.value;
    }

    // Enviando o valor da nova input
    fetch(`/crud/alterar_dados_filial`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js

            idServer: id,
            cepServer: cepVar,
            numeroServer: numeroVar,
            complementoServer: complementoVar,
            emailFilialServer: emailFilialVar,
            cnpjServer: cnpjVar,
            senhaServer: senhaVar,

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