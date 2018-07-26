const express = require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require ('cors');
const knex = require ('knex');
const signin = require ('./controllers/signin.js');
const register = require ('./controllers/register.js');
const profile = require ('./controllers/profile.js');
const image = require ('./controllers/image.js');


const db = knex({
	client: 'pg',
	connection: {
		host: 'postgresql-closed-50340',
		user: 'IMV1',
		password: '1234',
		database: 'brain_app'
	}
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{res.send('its working');})

app.post('/signin',signin.handleSignin(bcrypt,db));

app.post('/register',register.handleRegister(bcrypt,db));

app.get('/profile/:id',profile.handleProfile(db));

app.put('/image',image.handleImage(db));

app.post('/imageurl',(req, res) => {image.handleAPIcall(req, res)});  

app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is running on port ${process.env.PORT}`);
});

