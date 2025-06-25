const Chef = require('../models/Chef');
const fs = require('fs');
const path = require('path');

// Helper function to get the file path for deletion
const getImagePath = (filename) => path.join(__dirname, '..', 'uploads', 'chefs', filename);

// Get all chefs
exports.getChefs = async (req, res) => {
  try {
    const chefs = await Chef.find().sort({ createdAt: -1 });
    res.status(200).json(chefs);
  } catch (err) {
    console.error('Error fetching chefs:', err);
    res.status(500).json({ message: err.message }); // Standardized error
  }
};

// Get chef by ID
exports.getChefById = async (req, res) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.status(200).json(chef);
  } catch (err) {
    console.error('Error fetching chef:', err);
    res.status(500).json({ message: err.message }); // Standardized error
  }
};

// Create a new chef
exports.createChef = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Destructure all fields from the body, including the new description
    const { name, designation, description, socialLinks = {} } = req.body;
    
    // The image path is just the filename from multer
    const imageFilename = req.file.filename;

    const chef = new Chef({
      name,
      designation,
      description, // <-- ADDED
      image: imageFilename,
      socialLinks: {
        facebook: socialLinks.facebook || '',
        twitter: socialLinks.twitter || '',
        instagram: socialLinks.instagram || ''
      }
    });

    const savedChef = await chef.save();
    res.status(201).json(savedChef);
  } catch (err) {
    console.error('Error creating chef:', err);
    res.status(500).json({ message: err.message }); // Standardized error
  }
};

// Delete a chef by ID
exports.deleteChef = async (req, res) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }

    // Construct the full path to the image and delete it
    const imagePath = getImagePath(chef.image);
    fs.unlink(imagePath, (err) => {
      if (err) {
        // Log a warning but don't fail the request, as the DB entry is already gone
        console.warn(`Failed to delete image file: ${imagePath}`, err);
      }
    });

    res.status(200).json({ message: 'Chef deleted successfully' });
  } catch (err) {
    console.error('Error deleting chef:', err);
    res.status(500).json({ message: err.message }); // Standardized error
  }
};