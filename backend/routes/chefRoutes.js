const express = require('express');
const router = express.Router();
const chefController = require('../controllers/chefController');
const createUploader = require('../middleware/upload');

// Create a specific uploader for the 'chefs' subfolder
const upload = createUploader('chefs');

// GET all chefs
router.get('/', chefController.getChefs);

// GET single chef by ID
router.get('/:id', chefController.getChefById);

// POST create a new chef, with single image upload
router.post(
  '/',
  upload.single('image'), // Use the shared, configured middleware
  chefController.createChef
);

// DELETE a chef by ID
router.delete('/:id', chefController.deleteChef);

module.exports = router;