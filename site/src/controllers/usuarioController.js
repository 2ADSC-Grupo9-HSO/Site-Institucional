var usuarioModel = require("../models/usuarioModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
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
    var rede = req.body.redeServer;
    var cep = req.body.cepServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var telefone = req.body.telefoneServer;
    var cnpj = req.body.cnpjServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (rede == undefined) {
        res.status(400).send("Sua rede hospitalar está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu número está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("Seu telefone está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarFilial(rede, cep, numero, complemento, telefone, cnpj, senha)
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
    var cnpjFilial = req.body.cnpjFilialServer;
    var ala = req.body.alaServer;
    var andar = req.body.andarServer;
    var senhaMaquina = req.body.senhaMaquinaServer;

    // Faça as validações dos valores
    if (hostName == undefined) {
        res.status(400).send("Seu host name está undefined!");
    } else if (marca == undefined) {
        res.status(400).send("Sua marca está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Seu sistema operacional está undefined!");
    } else if (cnpjFilial == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (ala == undefined) {
        res.status(400).send("Sua ala está undefined!");
    } else if (andar == undefined) {
        res.status(400).send("Seu andar está undefined!");
    } else if (senhaMaquina == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrarMaquina(hostName, marca, so, cnpjFilial , ala, andar, senhaMaquina)
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
    var rede = req.body.redeServer;
    var nomeUsuario = req.body.nomeUsuarioServer;
    var cpf = req.body.cpfServer;
    var funcao = req.body.funcaoServer;
    var email = req.body.emailServer;
    var senhaUsuario = req.body.senhaUsuarioServer;
    

    // Faça as validações dos valores
    if (rede == undefined) {
        res.status(400).send("Sua rede hospitalar está undefined!");
    } else if (nomeUsuario == undefined) {
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
        usuarioModel.cadastrarUsuario(rede, nomeUsuario, cpf, funcao, email, senhaUsuario)
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
    listar,
    testar
}