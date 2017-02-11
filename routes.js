module.exports = function(app) {

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.get('/customer/:id', app.controllers.CustomerController.search);
  app.post('/customer', app.controllers.CustomerController.create);
  app.put('/customer/:id', app.controllers.CustomerController.update);
  app.delete('/customer/:id', app.controllers.CustomerController.delete);

}
