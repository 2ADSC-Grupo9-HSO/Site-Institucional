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

router.post("/cadastrarRede", function (req, res) {
    usuarioController.cadastrarRede(req, res);
})

router.get("/listar_maquina/:fkFilial", function (req, res) {
    usuarioController.listar_maquina(req, res);
});

router.get("/listar_andar", function (req, res) {
    usuarioController.listar_maquina(req, res);
});
router.get("/mostrar_dash/:idMaquina", function (req, res) {
    usuarioController.mostrar_dash(req, res);
});

router.get("/get_grafico_donut/:fkFilial", function (req, res) {
    usuarioController.get_grafico_donut(req, res);
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

module.exports = router;