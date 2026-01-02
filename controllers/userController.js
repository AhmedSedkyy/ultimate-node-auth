const db = require('../models/database');
const jwt = require('jsonwebtoken');


const User=db.User
const generateToken = (id) => {
    return jwt.sign({user_id:id} , process.env.JWT_SECRET, { expiresIn: '1d' });
};

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) 
            return res.status(400).json({ message: 'The email address is already registered'});

        const newUser = await User.create({
            username,
            email,
            password,
        });

        const token = generateToken(newUser.id);

        res.status(201).json({
            success: true,
            message: 'successfully registered',
            token,
            user: { id: newUser.id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'A server error occurred', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        
        const isMatch = await user.validPassword(password);
        if (!isMatch) 
            return res.status(401).json({ message: 'Incorrect email address or password' });

        const token = generateToken(user.id);

        res.json({
            success: true,
            token,
            user: { id: user.id, username: user.username }
        });

    } catch (error) {
        res.status(500).json({ message: 'A server error occurred', error: error.message });
    }
};


const profile = async (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            provider: req.user.provider
        }
    });
};


const socialCallback = (req, res) => {

    const token = generateToken(req.user.id);

    res.redirect(`http://localhost:3000/?token=${token}`);

};

module.exports = { register, login, profile , socialCallback };