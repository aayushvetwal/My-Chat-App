const socket = io.connect();

socket.on('test', (data) => {
	console.log(data);
	socket.emit('reply', 'Hi Server!');
});