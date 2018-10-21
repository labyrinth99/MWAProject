const config = require('../config.json');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

/*const users = [{ id: 1, username: 'amymalas@mum.edu', password: '123', firstName: 'Amer', lastName: 'Malas', role: 1 },
    { id: 2, username: 'amer.malas@gmail.com', password: '123', firstName: 'Amer', lastName: 'Malas', role: 2 }
];*/

module.exports = {
    authenticate
};

function authenticate({ username, password }) {
    //    const user = users.find(u => u.username === username && u.password === password)
    return new Promise((resolve, reject) => {
        User.findOne({ username: username, password: password }).then((user) => {
            if (user) {
                const token = jwt.sign({ sub: user._doc.role }, config.secret);
                const { password, ...userWithoutPassword } = user._doc;
                resolve({
                    ...userWithoutPassword,
                    token
                });
            } else { resolve(null) };
        }).catch(err => reject(err));
    });
}