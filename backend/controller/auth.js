const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const JWT_SECRET = 'myvalhere';
// Register a new user
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'oliver.jacobs34@ethereal.email',
        pass: 'gXKfJFbFb3mPyXHbF3',
      },
    });
    const mailOptions = {
      from: `"hasnain" <hasnain@gmail.com>`,
      to: 'itshasnain06@gmail.com',
      subject: 'Welcome to Our Website!',
      text: `Thank you for signing up. Your password is: ${password}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const invalidCredentialsError = new Error('Invalid login credentials');

    if (!user) {
      throw invalidCredentialsError;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw invalidCredentialsError;
    }

    const token = jwt.sign({ email }, JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(400).json({ message: error.message });
  }
};
// User logout
const logoutUser = async (req, res) => {
  try {
    // Perform any necessary logout operations

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
