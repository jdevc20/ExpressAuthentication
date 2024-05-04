const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const userService = new UserService();

class authController {
    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await userService.authenticateUser(username, password);
            // Generate JWT token
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async signup(req, res) {
        const { firstName, lastName, email, username, password, middleName, phone } = req.body;

        try {
            // Create user
            const newUser = await userService.createUser(firstName, lastName, email, username, password, middleName, phone);

            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async logout(req, res) {
        res.json({ message: 'Logged out successfully' });
    }
}

module.exports = authController;
