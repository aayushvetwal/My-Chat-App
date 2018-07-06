const socket = io.connect();

socket.on('test', (data) => {
	console.log(data);
	socket.emit('reply', 'Hi Server!');
});

function register(e){
	e.preventDefault();
	const email = e.target.elements.email.value;
	const password = e.target.elements.password.value;
	const data = {email, password};
	
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/register', true);	//xhhtp.open(form.method, form.action, true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(data));
	
};

const login = (e) => {
	e.preventDefault();
	const email = e.target.elements.lemail.value;
	const password = e.target.elements.lpassword.value;
	const data = {email, password};
	
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/login', true);	//xhhtp.open(form.method, form.action, true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(data));
	
};