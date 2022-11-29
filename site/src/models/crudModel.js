var database = require("../database/config");

function listar_maquina(fkFilial) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idMaquina, hostName, marcaMaquina, andarMaquina, sistemaOperacional, senhaMaquina
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbMaquina ON idFilial = fkFilial
        
        where fkFilial = ${fkFilial}

        ORDER BY idMaquina
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_funcionario(idFilial) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idUsuario, nomeUsuario, cargo
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbUsuario ON idFilial = fkFilial
        
        where fkFilial = ${idFilial}

        ORDER BY idUsuario
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_filial(idRede) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idFilial, cepFilial, cnpjFilial
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        where fkRede = ${idRede}

        ORDER BY idFilial
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar_maquina(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        DELETE FROM tbHistorico WHERE 
        fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina WHERE idMaquina = ${id} AND fkComponente = 1)
        OR fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina WHERE idMaquina = ${id} AND fkComponente = 2)
        OR fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina WHERE idMaquina = ${id} AND fkComponente = 3);
        DELETE FROM tbProcessos WHERE fkMaquina = ${id};
        DELETE FROM tbHardware WHERE fkMaquina = ${id};
        DELETE FROM tbMaquina WHERE idMaquina = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar_funcionario(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        DELETE FROM tbUsuario WHERE idUsuario = ${id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function deletar_filial(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        DELETE FROM tbHistorico WHERE 
        fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina JOIN tbFilialHospital ON idFilial = fkFilial WHERE idFilial = ${id} AND fkComponente = 1)
        OR fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina JOIN tbFilialHospital ON idFilial = fkFilial WHERE idFilial = ${id} AND fkComponente = 2)
        OR fkHardware = (SELECT idHardware FROM tbMaquina JOIN tbHardware ON idMaquina = fkMaquina JOIN tbFilialHospital ON idFilial = fkFilial WHERE idFilial = ${id} AND fkComponente = 3);
        DELETE FROM tbHardware WHERE fkMaquina = (SELECT idMaquina FROM tbMaquina JOIN tbFilialHospital ON idFilial = fkFilial WHERE idFilial = ${id});
        DELETE FROM tbProcessos WHERE fkMaquina = (SELECT idMaquina FROM tbMaquina JOIN tbFilialHospital ON idFilial = fkFilial WHERE idFilial = ${id});
        DELETE FROM tbMaquina WHERE fkFilial = ${id};
        DELETE FROM tbUsuario WHERE fkFilial = ${id};
        DELETE FROM tbFilialHospital WHERE idFilial = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function informacoes_maquina(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idMaquina, hostName, marcaMaquina, sistemaOperacional, andarMaquina, senhaMaquina
        FROM tbMaquina
        where idMaquina = ${id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function informacoes_funcionario(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idUsuario, fkFilial, nomeUsuario, cargo, email, cpf, senha
        FROM tbUsuario
        where idUsuario = ${id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function informacoes_filial(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT idFilial, cepFilial, numeroEndFilial, complementoEnd, cnpjFilial, senhaFilial, emailFilial
        FROM tbFilialHospital
        where idFilial = ${id}
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar_dados_maquina(id, hostName, marca, so, andar, senha) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", hostName, marca, so, andar, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE tbMaquina SET 
        hostName = '${hostName}', marcaMaquina = '${marca}', sistemaOperacional = '${so}', andarMaquina = ${andar}, senhaMaquina = '${senha}'
        WHERE idMaquina = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar_dados_funcionario(id, nomeUsuario, cpf, funcao, email, senhaUsuario) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", nomeUsuario, cpf, funcao, email, senhaUsuario);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE tbUsuario SET 
        nomeUsuario = '${nomeUsuario}', cpf = '${cpf}', email = '${email}', senha = '${senhaUsuario}', cargo = '${funcao}'
        WHERE idUsuario = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function alterar_dados_filial(id, cep, numero, complemento, emailFilial, cnpj, senha) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", cep, numero, complemento, emailFilial, cnpj, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        UPDATE tbFilialHospital SET
            cepFilial = '${cep}', numeroEndFilial = ${numero}, complementoEnd = '${complemento}', cnpjFilial = '${cnpj}', senhaFilial = '${senha}', emailFilial = '${emailFilial}'
            WHERE idFilial = ${id};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
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
