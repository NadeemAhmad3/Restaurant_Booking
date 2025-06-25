const express = require('express');
const { addMenuItem, getMenuItems, deleteMenuItem } = require('../controllers/menuController');
const createUploader = require('../middleware/upload'); // <-- Change import

const router = express.Router();

// Create an uploader specifically for 'menus'
const upload = createUploader('menus'); // <-- Use the factory

router.post('/', upload.single('image'), addMenuItem);
router.get('/', getMenuItems);
router.delete('/:id', deleteMenuItem);

module.exports = router;