require('dotenv').config();
const express = require('express');
const database = require('./models/database');
const passport = require('passport');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*                               Passport Configuration */

app.use(passport.initialize());

const passportJwt = require('./config/passport');
passportJwt(passport);


/*                                      Routes                      */


const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);



/*                                                       server                                     */
const port=process.env.PORT ||3000;
app.listen(port,()=>
{console.log(`Listening on ${port}`)});
