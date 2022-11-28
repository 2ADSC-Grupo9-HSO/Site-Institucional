var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrarFilial", function (req, res) {
    usuarioController.cadastrarFilial(req, res);
})

router.post("/cadastrarMaquina", function (req, res) {
    usuarioController.cadastrarMaquina(req, res);
})

router.post("/cadastrarHardware", function (req, res) {
    usuarioController.cadastrarHardware(req, res);
})


router.post("/cadastrarRede", function (req, res) {
    usuarioController.cadastrarRede(req, res);
})

router.get("/listar_maquina/:fkFilial", function (req, res) {
    usuarioController.listar_maquina(req, res);
});

router.get("/listar_andar", function (req, res) {
    usuarioController.listar_maquina(req, res);
});
router.get("/mostrar_dash/:idMaquina&:fkFilial", function (req, res) {
    usuarioController.mostrar_dash(req, res);
});

router.get("/get_grafico_donut/:fkFilial", function (req, res) {
    usuarioController.get_grafico_donut(req, res);
});

router.get("/get_processos/:fkMaquina", function (req, res) {
    usuarioController.get_processos(req, res);
});

router.post("/matar_processo", function (req, res) {
    usuarioController.matar_processo(req, res);
});

router.post("/reiniciar_maquina", function (req, res) {
    usuarioController.reiniciar_maquina(req, res);
});

router.get("/get_grafico_stacked/:fkFilial", function (req, res) {
    usuarioController.get_grafico_stacked(req, res);
});

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/autenticarUsuario", function (req, res) {
    usuarioController.entrarUsuario(req, res);
});

router.post("/autenticarFilial", function (req, res) {
    usuarioController.entrarFilial(req, res);
});

router.get("/validar_maquina_existente/:hostName", function (req, res) {
    usuarioController.validar_maquina_existente(req, res);
});

router.get("/validar_rede_existente/:email", function (req, res) {
    usuarioController.validar_rede_existente(req, res);
});

router.get("/validar_filial_existente/:email", function (req, res) {
    usuarioController.validar_filial_existente(req, res);
});

router.get("/validar_usuario_existente/:email&:cpf", function (req, res) {
    usuarioController.validar_usuario_existente(req, res);
});


module.exports = router;