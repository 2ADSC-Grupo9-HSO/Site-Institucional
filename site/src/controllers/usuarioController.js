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
        res.status(400).send("Seu cnpj/cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
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
                        res.status(403).send("CPF/CNPJ e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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
        res.status(400).send("Seu cnpj/cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
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
                        res.status(403).send("CPF/CNPJ e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var emailFilial = req.body.emailFilialServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;
    var fkRede = req.body.fkRedeServer

    // Faça as validações dos valores

    if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var hostName = req.body.hostNameServer;
    var marca = req.body.marcaServer;
    var so = req.body.soServer;
    var andar = req.body.andarServer;
    var fk_filial = req.body.fk_filialServer;
    var senha = req.body.senhaServer;


    // Faça as validações dos valores
    if (hostName == undefined) {
        res.status(400).send("Seu host name está undefined!");
    } else if (marca == undefined) {
        res.status(400).send("Sua marca está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Seu sistema operacional está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (andar == undefined) {
        res.status(400).send("Seu andar está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var hostName = req.body.hostNameServer;

    // Faça as validações dos valores
    if (hostName == undefined) {
        res.status(400).send("Seu host name está undefined!");
    }
    else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nomeRede = req.body.nomeRedeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (nomeRede == undefined) {
        res.status(400).send("Seu host name está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Sua marca está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Seu sistema operacional está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var nomeUsuario = req.body.nomeUsuarioServer;
    var cpf = req.body.cpfServer;
    var funcao = req.body.funcaoServer;
    var email = req.body.emailServer;
    var senhaUsuario = req.body.senhaUsuarioServer;
    var fk_filial = req.body.fk_filialServer


    // Faça as validações dos valores
    if (nomeUsuario == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (funcao == undefined) {
        res.status(400).send("Sua função está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaUsuario == undefined) {
        res.status(400).send("Seu senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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
    matar_processo
}