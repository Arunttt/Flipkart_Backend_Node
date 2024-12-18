const express = require('express');
const router = express.Router();
const PurchaseController = require('../Controllers/PurchaseController');

//-----------------Watch-------------------------
const WatchesController = require('../Controllers/WatchesController');

//----------------Mobile------------------------
router.post('/add', PurchaseController.createData);
router.post('/identify', PurchaseController.getProductsByIdentify);
router.get('/mobile/:name', PurchaseController.getProductsByFind);
// router.get('/allData',PurchaseController.getAll);

//-----------------Watch Routes-------------------
router.post('/watches', WatchesController.createWatch);
router.get('/watches', WatchesController.getAllWatches);
// router.get('/watches/:Brand', WatchesController.getWatchByBrand);
router.get('/watches/:id', WatchesController.getWatchById);
router.post('/fieldSearch', WatchesController.fieldSearch);
router.get('/allProduct', WatchesController.getAllData);
router.put('/updated/:id', WatchesController.disabledFunction);
router.put('/update/:id', WatchesController.updateProduct);
router.put('/watches/:Brand', WatchesController.updateWatch);
router.delete('/watches/:Brand', WatchesController.deleteWatch);
router.post('/disableProduct', WatchesController.Findbydisabel);

module.exports = router;
