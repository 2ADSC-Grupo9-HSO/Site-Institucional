var express = require("express");
var router = express.Router();

var crudController = require("../controllers/crudController");

router.get("/listar_maquina/:fkFilial", function (req, res) {
    crudController.listar_maquina(req, res);
});

module.exports = router;