var socket;
/*
socket.on('test', (data) => {
	console.log(data);
	socket.emit('reply', JSON.parse(localStorage.getItem('userInfo')));
}); */

function register(e){
	e.preventDefault();
	const email = e.target.elements.email.value;
	const password = e.target.elements.password.value;
	//const data = {email, password};
	
	firebase.auth()
		.createUserWithEmailAndPassword(email, password)
		.catch((e) => {
			
		});
	
	/*
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/register', true);	//xhhtp.open(form.method, form.action, true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(data));
	*/
};

const login = (e) => {
	e.preventDefault();
	const email = e.target.elements.lemail.value;
	const password = e.target.elements.lpassword.value;
	//const data = {email, password};
	
	firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => {
			window.location.replace('http://localhost:3000/page');
			
		})
		.catch((e) => {
			console.log(e);
		});
	
	
	/*
	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/login', true);	//xhhtp.open(form.method, form.action, true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(data));
	*/
};

const logout = () => {
	firebase.auth().signOut().then(() => {
		window.location.replace('http://localhost:3000');
	}).catch((e) => {
		
	});
};

const chatPageLoad = () => {
	const userInfo = JSON.parse(localStorage.getItem('userInfo'));
	document.getElementById('welcome').innerHTML = 'Welcome ' + userInfo.email;
	socket = io.connect();
	socket.emit('userInfo', localStorage.getItem('userInfo'));
	
	socket.on('message', (data) => {
		document.getElementById('messages').innerHTML += data + '<br/>'; 
	});
};

const send = () => {
	const message = document.getElementById('message').value;
	const email = document.getElementById('to').value;
	const data = {message, email};
	console.log(socket);
	if(!socket){
		socket.emit('message', data);
	}
};

firebase.auth().onAuthStateChanged((user) => {
	if(user){
		const uid = user.uid;
		const email = user.email;
		const userInfo = {uid, email};
		localStorage.setItem('userInfo', JSON.stringify(userInfo));
	} else {
		localStorage.removeItem('userInfo');
	}
});