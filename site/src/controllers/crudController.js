var crudModel = require("../models/crudModel");

function listar_maquina(req, res) {
    var fkFilial = req.params.fkFilial;

    crudModel.listar_maquina(fkFilial)
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

function listar_funcionario(req, res) {
    var idFilial = req.params.idFilial;

    crudModel.listar_funcionario(idFilial)
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

function listar_filial(req, res) {
    var idRede = req.params.idRede;

    crudModel.listar_filial(idRede)
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

function deletar_maquina(req, res) {
    var id = req.params.id;

    crudModel.deletar_maquina(id)
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

function deletar_funcionario(req, res) {
    var id = req.params.id;

    crudModel.deletar_funcionario(id)
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

function deletar_filial(req, res) {
    var id = req.params.id;

    crudModel.deletar_filial(id)
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

function informacoes_maquina(req, res) {
    var id = req.params.id;

    crudModel.informacoes_maquina(id)
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

function informacoes_funcionario(req, res) {
    var id = req.params.id;

    crudModel.informacoes_funcionario(id)
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

function informacoes_filial(req, res) {
    var id = req.params.id;

    crudModel.informacoes_filial(id)
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

function alterar_dados_maquina(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html

    var id = req.body.idServer;
    var hostName = req.body.hostNameServer;
    var marca = req.body.marcaServer;
    var so = req.body.soServer;
    var andar = req.body.andarServer;
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
        crudModel.alterar_dados_maquina(id, hostName, marca, so, andar, senha)
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

function alterar_dados_funcionario(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html

    var id = req.body.idServer;
    var nomeUsuario = req.body.nomeUsuarioServer;
    var cpf = req.body.cpfServer;
    var funcao = req.body.funcaoServer;
    var email = req.body.emailServer;
    var senhaUsuario = req.body.senhaUsuarioServer;


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
        crudModel.alterar_dados_funcionario(id, nomeUsuario, cpf, funcao, email, senhaUsuario)
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

function alterar_dados_filial(req, res) {
    // Crie uma vari??vel que v?? recuperar os valores do arquivo cadastro.html

    var id = req.body.idServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var emailFilial = req.body.emailFilialServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;


    // Fa??a as valida????es dos valores
    if (numero == undefined) {
        res.status(400).send("Seu nome est?? undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cpf est?? undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Sua fun????o est?? undefined!");
    } else if (emailFilial == undefined) {
        res.status(400).send("Seu email est?? undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu senha est?? undefined!");
    } else {

        // Passe os valores como par??metro e v?? para o arquivo usuarioModel.js
        crudModel.alterar_dados_filial(id, cep, numero, complemento, emailFilial, cnpj, senha)
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

module.exports = {
    listar_maquina,
    listar_funcionario,
    listar_filial,
    deletar_maquina,
    deletar_funcionario,
    deletar_filial,
    informacoes_maquina,
    informacoes_funcionario,
    informacoes_filial,
    alterar_dados_maquina,
    alterar_dados_funcionario,
    alterar_dados_filial
}