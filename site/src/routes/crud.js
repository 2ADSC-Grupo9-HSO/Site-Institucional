var express = require("express");
var router = express.Router();

var crudController = require("../controllers/crudController");

router.get("/listar_maquina/:fkFilial", function (req, res) {
    crudController.listar_maquina(req, res);
});

router.get("/listar_funcionario/:idFilial", function (req, res) {
    crudController.listar_funcionario(req, res);
});

router.get("/listar_filial/:idRede", function (req, res) {
    crudController.listar_filial(req, res);
});

router.delete("/deletar_maquina/:id", function (req, res) {
    crudController.deletar_maquina(req, res);
});

router.delete("/deletar_funcionario/:id", function (req, res) {
    crudController.deletar_funcionario(req, res);
});

router.delete("/deletar_filial/:id", function (req, res) {
    crudController.deletar_filial(req, res);
});

router.get("/informacoes_maquina/:id", function (req, res) {
    crudController.informacoes_maquina(req, res);
});

router.get("/informacoes_funcionario/:id", function (req, res) {
    crudController.informacoes_funcionario(req, res);
});

router.get("/informacoes_filial/:id", function (req, res) {
    crudController.informacoes_filial(req, res);
});

router.put("/alterar_dados_maquina", function (req, res) {
    crudController.alterar_dados_maquina(req, res);
});

router.put("/alterar_dados_funcionario", function (req, res) {
    crudController.alterar_dados_funcionario(req, res);
});

router.put("/alterar_dados_filial", function (req, res) {
    crudController.alterar_dados_filial(req, res);
});

module.exports = router;