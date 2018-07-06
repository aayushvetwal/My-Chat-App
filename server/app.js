const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const {firebase} = require('./firebase/firebase');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath));
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/register', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	firebase.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(() => {
			res.status(200).send('User created!');
		})
		.catch((e) => {
			
		});
});

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	
	firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			res.status(200).send('User created!');
		})
		.catch((e) => {
			
		});
});

io.on('connection', (socket) => {
	socket.emit('test', 'Server on port 3000');	
	
	//console.log(socket);
	console.log(socket.id);
	
	socket.on('reply', (data) => {
		console.log(data);
	});
});

firebase.auth().onAuthStateChanged((user) => {
	if(user){
		console.log('log-in');
		console.log(user);
	} else {
		//store.dispatch(logout());
		
		//console.log('log-out');
	}
});

server.listen(3000);