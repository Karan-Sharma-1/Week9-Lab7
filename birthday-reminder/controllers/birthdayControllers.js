// controllers/birthdayController.js
const Birthday = require('../models/birthdayModel');
const mongoose = require('mongoose');

// get all birthdays
const getBirthdays = async (req, res) => {
  try {
    const birthdays = await Birthday.find({}).sort({ createdAt: -1 });
    res.status(200).json(birthdays);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single birthday
const getBirthday = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such birthday'})
  }

  const birthday = await Birthday.findById(id)

  if (!birthday) {
    return res.status(404).json({error: 'No such birthday'})
  }

  res.status(200).json(birthday)
}

// create a new birthday
const createBirthday = async (req, res) => {
  const { name, age, image } = req.body;

  // add to the database
  try {
    const birthday = await Birthday.create({ name, age, image });
    res.status(200).json(birthday);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a birthday
const deleteBirthday = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such birthday'})
  }

  const birthday = await Birthday.findOneAndDelete({_id: id})

  if(!birthday) {
    return res.status(400).json({error: 'No such birthday'})
  }

  res.status(200).json(birthday)
}

// Update birthday using PATCH 
const patchBirthday = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such birthday'})
  }

  const birthday = await Birthday.findOneAndUpdate({_id: id}, {...req.body }, { 
      new: true, // To return the updated document
  })

  if (!birthday) {
    return res.status(400).json({error: 'No such birthday'})
  }

  res.status(200).json(birthday)
}

// Update birthday using PUT 
const putBirthday = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such birthday'})
  }

  const birthday = await Birthday.findOneAndUpdate({_id: id}, req.body , {
    new: true, // To return the updated document
    overwrite: true, // This will replace the entire document
  })

  if (!birthday) {
    return res.status(400).json({error: 'No such birthday'})
  }

  res.status(200).json(birthday)
}

module.exports = {
  getBirthdays,
  createBirthday,
  getBirthday,
  deleteBirthday,
  putBirthday,
  patchBirthday
};
