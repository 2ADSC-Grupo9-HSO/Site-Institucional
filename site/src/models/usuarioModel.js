var database = require("../database/config")

/* function mostrar_dash() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select m.idMaquina as 'id', m.nome as 'hostname', r.valorCPU as 'processador', r.valorMemoria as 'ram', r.valorDisco as 'disco'
    from tbMaquina m 
    inner join tbRegistros r
        on m.idMaquina = r.fkMaquina
        where andarMaquina = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
} */

function get_grafico_donut(fkFilial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function get_grafico_donut()");
    var instrucao = `
    select sum(cont) as "qtd_maquinas_debilitadas", (select count(idMaquina) from tbMaquina where fkFilial = 1) as "qtd_maquinas_total" from(

        select count(contagem) as 'cont' from(
          select count(fkMaquina) as 'contagem' from tbHistorico as hi
           join tbHardware as hw on hw.idHardware = hi.fkHardware
           join tbMaquina as m on m.idMaquina = hw.fkMaquina
           where valorRegistro >= 99 
           and hi.momentoRegistro > now() - interval 24 hour 
           and hw.fkComponente = 1
           and m.fkFilial = ${fkFilial} 
           group by hw.fkMaquina
        ) as tabela_comp_1 
           where contagem > 4
           
           union all
           
        select count(contagem) as 'cont' from(
          select count(fkMaquina) as 'contagem' from tbHistorico as hi
           join tbHardware as hw on hw.idHardware = hi.fkHardware
           join tbMaquina as m on m.idMaquina = hw.fkMaquina
           where valorRegistro >= 99 
           and hi.momentoRegistro > now() - interval 24 hour 
           and hw.fkComponente = 2
           and m.fkFilial = ${fkFilial}
           group by hw.fkMaquina
        ) as tabela_comp_2 
           where contagem > 10
           
           union all
           
        select count(contagem) as 'cont' from(
          select count(fkMaquina) as 'contagem' from tbHistorico as hi
           join tbHardware as hw on hw.idHardware = hi.fkHardware
           join tbMaquina as m on m.idMaquina = hw.fkMaquina
           where valorRegistro >= 99 
           and hi.momentoRegistro > now() - interval 24 hour 
           and hw.fkComponente = 3
           and m.fkFilial = ${fkFilial}
           group by hw.fkMaquina
        ) as tabela_comp_3
           where contagem > 6
        
        ) as tabela_final;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function listar_maquina(fkFilial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    WITH select_gerar_maquina AS (
        SELECT idHistorico, hostName, nomeComponente, valorRegistro , ROW_NUMBER() OVER (PARTITION BY hostName, nomeComponente ORDER BY idHistorico DESC) AS rn
        FROM tbRedeHospitalar
        
        JOIN tbFilialHospital ON idRede = fkRede
        
        JOIN tbMaquina ON idFilial = fkFilial
        
        JOIN tbHardware ON idMaquina = fkMaquina
        
        JOIN tbComponente ON idComponente = fkComponente
        
        JOIN tbHistorico ON idHardware = fkHardware
        
        where fkFilial = ${fkFilial}
        
        order by idHistorico
        )
        SELECT * FROM select_gerar_maquina WHERE rn = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function mostrar_dash(idMaquina) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
    select m.idMaquina as 'id',m.nome as 'nome', r.processador as 'processador', r.memoriaRam as 'ram', r.disco as 'disco'
    from tbMaquina m 
    inner join tbHistorico r
        on m.idMaquina = r.fkMaquina
        where idMaquina = ${idMaquina};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarFilial(cnpj, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cnpj, senha)
    var instrucao = `select idRede, nomeRede, idFilial
    from tbFilialHospital
    join tbRedeHospitalar
    on idRede = fkRede
    WHERE cnpjFilial = '${cnpj}' AND senhaFilial = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrarUsuario(cpf, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", cpf, senha)
    var instrucao = `select fkFilial, nomeUsuario, cpf from tbUsuario
    WHERE email = '${cpf}' AND senha = '${senha}'
    union
    select idRede, nomeRede, emailRede from tbRedeHospitalar
	where emailRede = '${cpf}' and senhaRede = '${senha}'
    union
    select idFilial, cepFilial, cnpjFilial
    from tbFilialHospital
    join tbRedeHospitalar
    on idRede = fkRede
    WHERE emailFilial = '${cpf}' AND senhaFilial = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarFilial( cep, numero, complemento,emailFilial, cnpj, senha, fkRede) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFilial():", cep, numero, complemento, emailFilial, cnpj, senha, fkRede);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbFilialHospital ( cepFilial, numeroEndFilial, complementoEnd, cnpjFilial, senhaFilial, emailFilial, fkRede) 
        VALUES ( '${cep}', '${numero}', '${complemento}', '${cnpj}', '${senha}', '${emailFilial}', ${fkRede});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarMaquina(hostName, marca, so, andar, fk_filial, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", hostName, marca, so, andar, fk_filial, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbMaquina (fkFilial, hostName, marcaMaquina,sistemaOperacional, andarMaquina, senhaMaquina ) 
        VALUES ('${fk_filial}', '${hostName}', '${marca}', '${so}', '${andar}' , '${senha}')
    `;
    var instrucao2 = `
    insert into tbHardware values
	    (null, (select idMaquina from tbMaquina order by idMaquina desc limit 1),1,100),
        (null, (select idMaquina from tbMaquina order by idMaquina desc limit 1),2,100),
        (null,(select idMaquina from tbMaquina order by idMaquina desc limit 1),3,100);
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao), database.executar(instrucao2);
}

function cadastrarRede(nomeRede, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarMaquina():", nomeRede, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbRedeHospitalar (nomeRede, emailRede, senhaRede) 
        VALUES ('${nomeRede}','${email}', '${senha}')
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


function cadastrarUsuario( nomeUsuario, cpf, funcao, email, senhaUsuario, fk_filial) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarUsuario():", nomeUsuario, cpf, funcao, email, senhaUsuario, fk_filial);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO tbUsuario (fkFilial, nomeUsuario, cpf, email, senha, cargo) 
        VALUES ('${fk_filial}', '${nomeUsuario}', '${cpf}', '${email}', '${senhaUsuario}', '${funcao}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrarFilial,
    entrarUsuario,
    cadastrarFilial,
    cadastrarMaquina,
    cadastrarUsuario,
    listar_maquina,
/*     listar_andar */
    mostrar_dash,
    cadastrarRede,
    get_grafico_donut
};