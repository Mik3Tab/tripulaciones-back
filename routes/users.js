const express = require('express');
const router = express.Router()
const UserController = require('../controllers/UserController');
const { authentication } = require('../middlewares/authentication');
const { uploadUserImages } = require('../middlewares/multer');
const { isAdmin } = require('../middlewares/role');

router.post('/', UserController.create);
router.get('/confirm/:emailToken',UserController.confirm);
router.post('/login', UserController.login);
router.delete('/logout', authentication , UserController.logout);
router.get('/id/:_id', authentication, UserController.getById);
router.get('/name/:name', authentication, UserController.getUserByName);
router.get('/', authentication, UserController.getAll);
router.put('/', authentication, uploadUserImages.single('imageUser'), UserController.update);
router.delete('/admin/:_id', authentication, isAdmin, UserController.delete);
router.delete('/', authentication , UserController.deleteMySelf);
router.put('/resetPassword/:recoverToken', UserController.resetPassword);
router.get('/recoverPassword/:email', UserController.recoverPasswod);

module.exports = router;