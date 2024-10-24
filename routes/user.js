const express = require('express')
const UserController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth('admin'), UserController.getAllUsers);
router.get('/:id', UserController.getSingleUser);
router.post('/login', UserController.login);
router.post('/register', UserController.signup);
router.patch('/:id', auth('admin'), UserController.updateUser);
router.delete('/:id', auth('admin'), UserController.deleteUser);


module.exports = router