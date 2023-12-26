// routes/birthdayRoutes.js
const express = require('express');
const {
  getBirthdays,
  createBirthday,
  getBirthday,
  deleteBirthday, 
  putBirthday,
  patchBirthday
} = require('../controllers/birthdayControllers');

const router = express.Router();

// GET all birthdays
router.get('/', getBirthdays);

// GET a single birthday
router.get('/:id', getBirthday);

// POST a new birthday
router.post('/', createBirthday);

// DELETE a birthday
router.delete('/:id', deleteBirthday);

// Update birthday using PATCH 
router.patch('/:id', patchBirthday);

// Update birthday using PUT 
router.put('/:id', putBirthday);

module.exports = router;
