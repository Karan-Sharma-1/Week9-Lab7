// controllers/menuController.js
const Menu = require('../models/menuModel');
const mongoose = require('mongoose');

// get all menus
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({}).sort({ createdAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single menu
const getMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such menu'})
  }

  const menu = await Menu.findById(id)

  if (!menu) {
    return res.status(404).json({error: 'No such menu'})
  }

  res.status(200).json(menu)
}

// create a new menu
const createMenu = async (req, res) => {
  const { name, age, image } = req.body;

  // add to the database
  try {
    const menu = await Menu.create({ name, age, image });
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a menu
const deleteMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such menu'})
  }

  const menu = await Menu.findOneAndDelete({_id: id})

  if(!menu) {
    return res.status(400).json({error: 'No such menu'})
  }

  res.status(200).json(menu)
}

// Update menu using PATCH 
const patchMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such menu'})
  }

  const menu = await Menu.findOneAndUpdate({_id: id}, {...req.body }, { 
      new: true, // To return the updated document
  })

  if (!menu) {
    return res.status(400).json({error: 'No such menu'})
  }

  res.status(200).json(menu)
}

// Update menu using PUT 
const putMenu = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such menu'})
  }

  const menu = await Menu.findOneAndUpdate({_id: id}, req.body , {
    new: true, // To return the updated document
    overwrite: true, // This will replace the entire document
  })

  if (!menu) {
    return res.status(400).json({error: 'No such menu'})
  }

  res.status(200).json(menu)
}

module.exports = {
  getMenus,
  createMenu,
  getMenu,
  deleteMenu,
  putMenu,
  patchMenu
};
