const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const {firebase} = require('./firebase/firebase');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const userMap = {};

const publicPath = path.join(__dirname, '..', 'public')
app.use(express.static(publicPath));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/page', (req, res) => {
	res.sendFile(path.join(publicPath, 'chatPage.html'));
});

app.post('/register', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	
});

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;
	
	
});

io.on('connection', (socket) => {
	socket.emit('test', 'Server on port 3000');	
	
	//console.log(socket);
	//console.log(socket.id);
	
	socket.on('userInfo', (data) => {
		const userInfo = JSON.parse(data);
		if(!userMap[userInfo.email]){
			userMap[userInfo.email] = socket.id;
		}
		console.log(userMap);
	});
	
	socket.on('message', (data) => {
		console.log('sent');
		io.to(userMap[data.email]).emit('message', getEmail() + ' ' + data.message);
	});
});

const getEmail = (socketId) => userMap.filter((element) => element === socketId).keys()[0];

server.listen(3000);