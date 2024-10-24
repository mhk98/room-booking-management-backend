const express = require('express')
const RoomController = require('../controllers/room.controller');
const { singleUpload } = require('../middlewares/upload');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', RoomController.getAllRoom);
router.get('/:id', RoomController.getSingleRoom);
router.post('/create', auth('admin'), singleUpload, RoomController.createRoom);
router.patch('/:id', auth('admin'), singleUpload, RoomController.updateRoom);
router.delete('/:id', auth('admin'), RoomController.deleteRoom);


module.exports = router