function criar_card() {
    var fkFilial = sessionStorage.FK_FILIAL;
    fetch(`/crud/listar_maquina/${fkFilial}`).then(function (resposta) {
        if (resposta.ok) {
            resposta.json().then(function (resposta) {
                console.log("Dados recebidos: ", JSON.stringify(resposta));


                let id = [];
                let nome = [];
                let marca = [];
                let sistema = [];
                let andar = [];
                let senha = [];

                for (let i = 0; i < resposta.length; i++) {

                    id.push(resposta[i].idMaquina);
                    nome.push(resposta[i].hostName);
                    marca.push(resposta[i].marcaMaquina);
                    sistema.push(resposta[i].sistemaOperacional);
                    andar.push(resposta[i].andarMaquina);
                    senha.push(resposta[i].senhaMaquina);

                }

                for (let i = 0; i < nome.length; i++) {
                    divCrud.innerHTML += `
                        <div class="cardMaquinaWww">
                            ${id[i]}
                            ${nome[i]}
                            ${marca[i]}
                            ${sistema[i]}
                            ${andar[i]}
                            ${senha[i]}
                        </div>
                    `
                }


            });
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });

}