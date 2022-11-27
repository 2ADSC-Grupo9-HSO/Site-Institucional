var database = require("../database/config");

function listar_maquina(fkFilial) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    WITH select_gerar_maquina AS (
        SELECT idMaquina, hostName, marcaMaquina, andarMaquina, sistemaOperacional, senhaMaquina, ROW_NUMBER() OVER (PARTITION BY hostName) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbMaquina ON idFilial = fkFilial
        
        JOIN tbHardware ON idMaquina = fkMaquina
        
        JOIN tbComponente ON idComponente = fkComponente
        
        where fkFilial = ${fkFilial}

        ORDER BY idMaquina
        )
        SELECT * FROM select_gerar_maquina WHERE rn = 1;
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
    WITH select_gerar_funcionario AS (
        SELECT idFilial, cepFilial, ruaFilial, bairroFilial, cidadeFilial, numeroEndFilial, complementoEnd, cnpjFilial, emailFilial, senhaFilial, ROW_NUMBER() OVER (PARTITION BY ruaFilial) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        where fkRede = ${idRede}

        ORDER BY idFilial
        )
        SELECT * FROM select_gerar_funcionario WHERE rn = 1;
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

function deletar_funcionario(id) {
    console.log("ACESSEI O CRUD MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        DELETE FROM tbUsuario WHERE idUsuario = ${id}
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

module.exports = {
    listar_maquina,
    listar_funcionario,
    listar_filial,
    deletar_funcionario,
    informacoes_funcionario,
    alterar_dados_funcionario
}
