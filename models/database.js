const {Sequelize,DataTypes}  = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

sequelize.authenticate()
.then(()=>{console.log("Connect to Database .....")})
.catch((err)=>{console.log(err.message)})


db={};

db.User=require('./User')(sequelize,DataTypes)


sequelize.sync({force:false}).then(()=>{
    console.log("Successful");
}).catch((err)=>{
    console.log("Failed");
})


module.exports =db;

