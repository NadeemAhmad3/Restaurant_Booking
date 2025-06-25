const MenuItem = require('../models/MenuItem');

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.filename : null;
        const menuItem = new MenuItem({ name, description, price, image });
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all menu items
exports.getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a menu item by ID
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await MenuItem.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ error: 'Menu item not found' });
        res.json({ message: 'Menu item deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};