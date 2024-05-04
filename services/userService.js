const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UserService {
    async createUser(firstName, lastName, email, username, password, middleName = '', phone = '') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstName,
            lastName,
            middleName,
            email,
            username,
            phone,
            password: hashedPassword
        });
        return await user.save();
    }

    async updateUserDetails(userId, updates) {
        return await User.findByIdAndUpdate(userId, updates, { new: true });
    }

    async getAllUsers() {
        return await User.find({}, '-password');
    }

    async getUserById(userId) {
        return await User.findById(userId, '-password');
    }

    async authenticateUser(username, password) {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        return user;
    }
}

module.exports = UserService;
