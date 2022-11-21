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

module.exports = router;