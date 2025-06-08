const User = require('../models/User');

exports.getUsers = async (req, res) => {
  const users = await User.find().select('-password').lean();
  res.json(users);
};

exports.createUser = async (req, res) => {

};

exports.getUserById = async (req, res) => {
  
};

exports.deleteUser = async (req, res) => {

};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password').lean();
  res.json(user);
};

exports.updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!updated) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(updated);
};
