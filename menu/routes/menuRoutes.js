// routes/menuRoutes.js
const express = require('express');
const {
  getMenus,
  createMenu,
  getMenu,
  deleteMenu, 
  putMenu,
  patchMenu
} = require('../controllers/menuControllers');

const router = express.Router();

// GET all menus
router.get('/', getMenus);

// GET a single menu
router.get('/:id', getMenu);

// POST a new menu
router.post('/', createMenu);

// DELETE a menu
router.delete('/:id', deleteMenu);

// Update menu using PATCH 
router.patch('/:id', patchMenu);

// Update menu using PUT 
router.put('/:id', putMenu);

module.exports = router;
