const bcrypt = require('bcryptjs');


module.exports =(sequelize,DataTypes)=> {
    const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true 
    },
    provider: {
        type: DataTypes.STRING,
        defaultValue: 'local' 
    },
    googleId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    facebookId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});


User.beforeCreate(async function (user) {
    if (user.password) 
        user.password = await bcrypt.hash(user.password, 10);
    })

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

    return User;
}