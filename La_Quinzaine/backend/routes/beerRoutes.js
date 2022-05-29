const express = require('express');
const beerControllers = require('../controllers/beerControllers');
const router = express.Router();

// @route GET && POST - /beer/
router
    .route("/")
    .get(beerControllers.getAllBeers)
    .post(beerControllers.createBeer);


router.route("/:idBeer").get(beerControllers.getbeerBybeerId);

module.exports = router;