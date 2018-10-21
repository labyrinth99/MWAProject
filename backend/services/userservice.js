const config = require('../config.json');
const jwt = require('jsonwebtoken');

const users = [{ id: 1, username: 'amymalas@mum.edu', password: '123', firstName: 'Amer', lastName: 'Malas', role: 1 },
    { id: 2, username: 'amer.malas@gmail.com', password: '123', firstName: 'Amer', lastName: 'Malas', role: 2 }
];

module.exports = {
    authenticate
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.role }, config.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
}