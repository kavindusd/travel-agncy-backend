const express= require('express');
const router = express.Router();
const {createVisa, getAllVisa, getVisaById, updateVisaStatus} = require('../Controllers/visaController')

//  /api/visas/book
router.post('/book',createVisa);

//  /api/visas/all
router.get('/all', getAllVisa);

//  /api/visas/:id
router.get('/:id', getVisaById);

router.patch('/status/:id',updateVisaStatus);


module.exports = router;