var express = require('express');
var router = express.Router();
var ProductModel = require('../schema/product');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/add', function(req, res, next) {
  res.render('add-form');
});

/* POST Data. */
router.post('/add', function(req, res, next) {
  console.log(req.body);

  //Array of data
  const mybodydata = {
      p_name: req.body.p_name,
      p_price: req.body.p_price,
      p_desc: req.body.p_desc
  }
  var data = ProductModel(mybodydata);
  data.save(function(err) {
      if (err) {
          res.render('add-form', { message: 'Product registered not successfully!' });
      } else {
          res.render('add-form', { message: 'Product registered successfully!' });
      }
  })
});

//List Table Data
router.get('/display', function(req, res) {
  ProductModel.find(function(err, products) {
      if (err) {
          console.log(err);
      } else {
          res.render('display-table', { products: products });
          console.log(products);
      }
  });
});

/* GET SINGLE Product BY ID */
router.get('/edit/:id', function(req, res) {
  console.log(req.params.id);
  ProductModel.findById(req.params.id, function(err, products) {
      if (err) {
          console.log(err);
      } else {
          console.log(products);
          res.render('edit-form', { products: products });
      }
  });
});

/* UPDATE Product */
router.post('/edit/:id', function(req, res) {
  console.log("Edit ID is" + req.params.id);
  const mybodydata = {
    p_name: req.body.p_name,
    p_price: req.body.p_price,
    p_desc: req.body.p_desc
}
  ProductModel.findByIdAndUpdate(req.params.id, mybodydata, function(err) {
      if (err) {
          res.redirect('edit/' + req.params.id);
      } else {
          res.redirect('../display');
      }
  });
});

/* DELETE Product BY ID */
router.get('/delete/:id', function(req, res) {
  ProductModel.findByIdAndRemove(req.params.id, function(err, project) {
      if (err) {
          res.redirect('../display');
      } else {
          res.redirect('../display');
      }
  });
});

module.exports = router;
