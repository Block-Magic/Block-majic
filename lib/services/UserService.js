const bcrypt = require('bcryptjs/dist/bcrypt');
const User = require('../models/User');

module.exports = class UserService {
    static async createUser({ email, password }) {
        try{
            const hashedPassword = bcrypt.hashSync(
                password, 
                Number(`${process.env.Salt_ROUNDS}`)
            );
            return User.insert({
                email,
                hashedPassword
            });
        } catch(error){
            error.status = 401;
            throw error;
        }
    }
}