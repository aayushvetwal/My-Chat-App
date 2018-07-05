const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const publicPath = path.join(__dirname, '..', 'public')
//app.use(express.static(publicPath));


app.get('/', (req, res) => {
	res.sendFile(path.join(publicPath, 'index.html'));
});

io.on('connection', (socket) => {
	socket.emit('test', 'Server on port 3000');	
	
	console.log(socket);
	console.log(socket.id);
	
	socket.on('reply', (data) => {
		console.log(data);
	});
});

server.listen(3000);