const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //GESTIONE PRODOTTI
  app.get(
    "/gestione-ordini/prodotti",
    [authJwt.verifyToken],
    controller.findAllProduct
  );
  app.delete(
    "/gestione-ordini/prodotto/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProduct
  );
  app.post(
    "/gestione-ordini/prodotti",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createProduct
  );

  //GESTIONE PRODOTTI SPLIT
  app.get(
    "/gestione-ordini/prodottsplit",
    [authJwt.verifyToken],
    controller.findAllProductsplit
  );
  app.get(
    "/gestione-ordini/prodottisplit",
    [authJwt.verifyToken],
    controller.findProductsplit
  );
  app.get(
    "/gestione-ordini/pesosplit/:prodotto",
    [authJwt.verifyToken],
    controller.findPesosplit
  );
  app.get(
    "/gestione-ordini/pezzaturasplit",
    [authJwt.verifyToken],
    controller.findPezzaturasplit
  );
  app.delete(
    "/gestione-ordini/prodottosplit/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteProductsplit
  );
  app.post(
    "/gestione-ordini/prodottisplit",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.createProductsplit
  );
  //GESTIONE ORDINI
  app.post(
    "/gestione-ordini/ordine",
    [authJwt.verifyToken],
    controller.createOrdine
  );
  app.get(
    "/gestione-ordini/ordini/:seller",
    [authJwt.verifyToken],
    controller.findAllTodayUser
  );
  app.get(
    "/gestione-ordini/ordine/all",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAllOrdini
  );
  app.get(
    "/gestione-ordini/ordiniDay",
    [authJwt.verifyToken],
    controller.findAllDayUser
  );
  app.delete(
    "/gestione-ordini/ordine/:id",
    [authJwt.verifyToken],
    controller.deleteOrdine
  );
  // PER REPORT
  app.get(
    "/gestione-ordine/todayOrder",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.todayOrder
  );
  app.get(
    "/gestione-ordine/dateOrder/:orderDate",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.dateOrder
  );
  app.get(
    "/gestione-ordine/allOrder/:orderDate?",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.dateOrderAll
  );
  app.get(
    "/gestione-ordine/monthyearReport/:monthyear",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.monthyearReport
  );
  app.get(
    "/gestione-ordine/availableMonth",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOrderMonthYear
  );
  app.get(
    "/gestione-ordine/availableYear",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findOrderYear
  );

  //LOGGING
  app.post("/logging", [authJwt.verifyToken], controller.createLog);
  app.get("/getlog", [authJwt.verifyToken, authJwt.isAdmin], controller.getLog);

  //API DI TEST
  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
