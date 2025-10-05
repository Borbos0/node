const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username } = req.body;

    const user = new User({
      firstName,
      lastName,
      username
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { firstName, lastName, username } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, username },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.json(user);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        message: error.message
      });
    }
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        error: 'Not Found',
        message: 'User not found'
      });
    }
    next(error);
  }
};
