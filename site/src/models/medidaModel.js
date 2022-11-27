var database = require("../database/config");

function buscarUltimasMedidas(idMaquina) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 18 hi.valorRegistro 'registro', c.nomeComponente, CONVERT(varchar, hi.momentoRegistro, 108) 'momento'
        FROM tbRedeHospitalar
        JOIN tbFilialHospital ON idRede = fkRede
        JOIN tbMaquina ON idFilial = fkFilial
        JOIN tbHardware ON idMaquina = fkMaquina
        JOIN tbComponente c ON idComponente = fkComponente
        JOIN tbHistorico hi ON idHardware = fkHardware
        where idMaquina = ${idMaquina}
        order by idHistorico desc;`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select hi.valorRegistro as 'registro', c.nomeComponente, DATE_FORMAT(hi.momentoRegistro,'%H:%i:%s') as 'momento'
                        FROM tbRedeHospitalar
                        JOIN tbFilialHospital ON idRede = fkRede
                        JOIN tbMaquina ON idFilial = fkFilial
                        JOIN tbHardware ON idMaquina = fkMaquina
                        JOIN tbComponente as c ON idComponente = fkComponente
                        JOIN tbHistorico as hi ON idHardware = fkHardware
                        where idMaquina = ${idMaquina}
                        order by idHistorico desc limit 18;
        `;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idMaquina) {
    ''

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 3 hi.valorRegistro 'registro', c.nomeComponente, CONVERT(varchar, hi.momentoRegistro, 108) 'momento'
                        FROM tbRedeHospitalar
                        JOIN tbFilialHospital ON idRede = fkRede
                        JOIN tbMaquina ON idFilial = fkFilial
                        JOIN tbHardware ON idMaquina = fkMaquina
                        JOIN tbComponente c ON idComponente = fkComponente
                        JOIN tbHistorico hi ON idHardware = fkHardware
                        where idMaquina = ${idMaquina}
                        order by idHistorico desc;`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select hi.valorRegistro as 'registro', c.nomeComponente, DATE_FORMAT(hi.momentoRegistro,'%H:%i:%s') as 'momento'
                        FROM tbRedeHospitalar
                        JOIN tbFilialHospital ON idRede = fkRede
                        JOIN tbMaquina ON idFilial = fkFilial
                        JOIN tbHardware ON idMaquina = fkMaquina
                        JOIN tbComponente as c ON idComponente = fkComponente
                        JOIN tbHistorico as hi ON idHardware = fkHardware
                        where idMaquina = ${idMaquina}
                        order by idHistorico desc limit 3`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
