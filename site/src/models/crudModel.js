var database = require("../database/config");

function listar_maquina(fkFilial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    WITH select_gerar_maquina AS (
        SELECT idMaquina, hostName, marcaMaquina, andarMaquina, sistemaOperacional, senhaMaquina, ROW_NUMBER() OVER (PARTITION BY hostName ORDER BY idMaquina DESC) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbMaquina ON idFilial = fkFilial
        
        JOIN tbHardware ON idMaquina = fkMaquina
        
        JOIN tbComponente ON idComponente = fkComponente
        
        where fkFilial = ${fkFilial}
        )
        SELECT * FROM select_gerar_maquina WHERE rn = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_funcionario(idFilial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    WITH select_gerar_funcionario AS (
        SELECT idUsuario, nomeUsuario, cargo, email, cpf, senha, ROW_NUMBER() OVER (PARTITION BY nomeUsuario ORDER BY idUsuario DESC) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbUsuario ON idFilial = fkFilial
        
        where fkFilial = ${idFilial}
        )
        SELECT * FROM select_gerar_funcionario WHERE rn = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar_filial(idRede) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    WITH select_gerar_funcionario AS (
        SELECT idFilial, cepFilial, numeroEndFilial, complementoEnd, cnpjFilial, emailFilial, senhaFilial, ROW_NUMBER() OVER (PARTITION BY cepFilial ORDER BY idFilial DESC) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        where fkRede = ${idRede}
        )
        SELECT * FROM select_gerar_funcionario WHERE rn = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar_maquina,
    listar_funcionario,
    listar_filial
}
