const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.index);

router.get('/joindata', userController.joindata);

router.get('/:id', userController.showdata);

router.post('/insert', userController.insert);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.delete);

module.exports = router;
