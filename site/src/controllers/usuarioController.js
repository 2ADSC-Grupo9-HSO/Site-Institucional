var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar_maquina(req, res) {
    var fkFilial = req.params.fkFilial;

    usuarioModel.listar_maquina(fkFilial)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function get_grafico_donut(req, res) {
    var fkFilial = req.params.fkFilial;

    usuarioModel.get_grafico_donut(fkFilial)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function get_grafico_stacked(req, res) {
    var fkFilial = req.params.fkFilial;

    usuarioModel.get_grafico_stacked(fkFilial)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function get_processos(req, res) {
    var fkMaquina = req.params.fkMaquina;
    usuarioModel.get_processos(fkMaquina)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function matar_processo(req, res) {
    var idProcesso = req.body.idProcessoServer;
    usuarioModel.matar_processo(idProcesso)
        .then(function (resultado) {
            res.json(resultado)
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function reiniciar_maquina(req, res) {
    var fkMaquina = req.body.fkMaquinaServer;
    usuarioModel.reiniciar_maquina(fkMaquina)
        .then(function (resultado) {
            res.json(resultado)
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function mostrar_dash(req, res) {
    var idMaquina = req.params.idMaquina;
    var fkFilial = req.params.fkFilial;


    usuarioModel.mostrar_dash(idMaquina,fkFilial)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrarFilial(req, res) {
    var cpf_cnpj = req.body.cpf_cnpjServer;
    var senha = req.body.senhaServer;

    if (cpf_cnpj == undefined) {
        res.status(400).send("Seu cnpj/cpf est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha est?? indefinida!");
    } else {

        usuarioModel.entrarFilial(cpf_cnpj, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("CPF/CNPJ e/ou senha inv??lido(s)");
                    } else {
                        res.status(403).send("Mais de um usu??rio com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function entrarUsuario(req, res) {
    var cpf_cnpj = req.body.cpf_cnpjServer;
    var senha = req.body.senhaServer;

    if (cpf_cnpj == undefined) {
        res.status(400).send("Seu cnpj/cpf est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha est?? indefinida!");
    } else {

        usuarioModel.entrarUsuario(cpf_cnpj, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("CPF/CNPJ e/ou senha inv??lido(s)");
                    } else {
                        res.status(403).send("Mais de um usu??rio com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrarFilial(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html

    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var emailFilial = req.body.emailFilialServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;
    var fkRede = req.body.fkRedeServer

    // Fa??a as valida????es dos valores

    if (cep == undefined) {
        res.status(400).send("Seu cep est?? undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu n??mero est?? undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu n??mero est?? undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha est?? undefined!");
    } else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrarFilial(cep, numero, complemento, emailFilial, cnpj, senha, fkRede)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarMaquina(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html
    var hostName = req.body.hostNameServer;
    var marca = req.body.marcaServer;
    var so = req.body.soServer;
    var andar = req.body.andarServer;
    var fk_filial = req.body.fk_filialServer;
    var senha = req.body.senhaServer;


    // Fa??a as valida????es dos valores
    if (hostName == undefined) {
        res.status(400).send("Seu host name est?? undefined!");
    } else if (marca == undefined) {
        res.status(400).send("Sua marca est?? undefined!");
    } else if (so == undefined) {
        res.status(400).send("Seu sistema operacional est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu cnpj est?? undefined!");
    } else if (andar == undefined) {
        res.status(400).send("Seu andar est?? undefined!");
    } else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrarMaquina(hostName, marca, so, andar, fk_filial, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarHardware(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html
    var hostName = req.body.hostNameServer;

    // Fa??a as valida????es dos valores
    if (hostName == undefined) {
        res.status(400).send("Seu host name est?? undefined!");
    }
    else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrarHardware(hostName)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarRede(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html
    var nomeRede = req.body.nomeRedeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Fa??a as valida????es dos valores
    if (nomeRede == undefined) {
        res.status(400).send("Seu host name est?? undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua marca est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu sistema operacional est?? undefined!");
    } else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrarRede(nomeRede, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarUsuario(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html

    var nomeUsuario = req.body.nomeUsuarioServer;
    var cpf = req.body.cpfServer;
    var funcao = req.body.funcaoServer;
    var email = req.body.emailServer;
    var senhaUsuario = req.body.senhaUsuarioServer;
    var fk_filial = req.body.fk_filialServer


    // Fa??a as valida????es dos valores
    if (nomeUsuario == undefined) {
        res.status(400).send("Seu nome est?? undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf est?? undefined!");
    } else if (funcao == undefined) {
        res.status(400).send("Sua fun????o est?? undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email est?? undefined!");
    } else if (senhaUsuario == undefined) {
        res.status(400).send("Seu senha est?? undefined!");
    } else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        usuarioModel.cadastrarUsuario(nomeUsuario, cpf, funcao, email, senhaUsuario, fk_filial)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function validar_maquina_existente(req, res) {
    var hostName = req.params.hostName;
    usuarioModel.validar_maquina_existente(hostName)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validar_rede_existente(req, res) {
    var email = req.params.email;
    usuarioModel.validar_rede_existente(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validar_filial_existente(req, res) {
    var email = req.params.email;
    usuarioModel.validar_filial_existente(email)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function validar_usuario_existente(req, res) {
    var email = req.params.email;
    var cpf = req.params.cpf;
    usuarioModel.validar_usuario_existente(email, cpf)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}


module.exports = {
    entrarFilial,
    entrarUsuario,
    cadastrarFilial,
    cadastrarMaquina,
    cadastrarUsuario,
    listar_maquina,
    testar,
    mostrar_dash,
    cadastrarRede,
    get_grafico_donut,
    get_grafico_stacked,
    cadastrarHardware,
    get_processos,
    matar_processo,
    reiniciar_maquina,
    validar_maquina_existente,
    validar_rede_existente,
    validar_filial_existente,
    validar_usuario_existente
}