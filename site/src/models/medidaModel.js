var database = require("../database/config");

function buscarUltimasMedidas(idMaquina) {
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
                        temperatura, 
                        umidade, 
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idMaquina}
                    order by id desc`;
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

function buscarMedidasEmTempoReal(idMaquina) {''
    
    instrucaoSql = ''
    
    if (process.env.AMBIENTE_PROCESSO == "producao") {       
        instrucaoSql = `select hi.valorRegistro as 'registro', c.nomeComponente, DATE_FORMAT(hi.momentoRegistro,'%H:%i:%s') as 'momento'
                        FROM tbRedeHospitalar
                        JOIN tbFilialHospital ON idRede = fkRede
                        JOIN tbMaquina ON idFilial = fkFilial
                        JOIN tbHardware ON idMaquina = fkMaquina
                        JOIN tbComponente as c ON idComponente = fkComponente
                        JOIN tbHistorico as hi ON idHardware = fkHardware
                        where idMaquina = ${idMaquina}
                        order by idHistorico desc limit 3;`;
        
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
