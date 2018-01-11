
document.getElementById("searchHeader").addEventListener("click", getPosts);

var store = [];
function getPosts(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);
	xhr.send();
	xhr.onload = ()=>{
		console.log(JSON.parse(xhr.responseText));
		store = JSON.parse(xhr.responseText);
		createList(store);
		};
};
function findUser () {
	
	if(document.getElementById("modalWin")){
		document.getElementById("modalWin").parentElement.removeChild(document.getElementById("modalWin"));
		return;

	}

	var btn = this;
    userId = this.userId;

	function getUserInfo (userId){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://jsonplaceholder.typicode.com/users/' + userId, true);
		xhr.send();
		xhr.onload = ()=>{
			console.log(JSON.parse(xhr.responseText));	
			createUser.call(btn, JSON.parse(xhr.responseText));
			};
	};
	getUserInfo(userId);
};
function findCommentUser () {
	if(document.getElementById("postIdDel")){
		document.getElementById("postIdDel").parentElement.removeChild(document.getElementById("postIdDel"));
		return;
	}
	var btn = this;
    var idCom = this.postId;
	function getUserInfoCom (userIdCom){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/' + idCom + '/comments', true);
		xhr.send();
		xhr.onload = ()=>{
			console.log(JSON.parse(xhr.responseText));	
			createComment.call(btn, JSON.parse(xhr.responseText));
			};
	};
	getUserInfoCom(idCom);
};
function createUser(obj){
	var modalWinUser = this.parentElement.appendChild(document.createElement('div'));
		modalWinUser.id = 'modalWin';

	modalWinUser.innerHTML = `
	<p class='mb-1'>name: ${obj.name}</p>
	<p class='mb-1'>username:  ${obj.username}</p>
	<p class='mb-1'>email:  ${obj.email}</p>
		<ul class='mb-1'>address:
			<li class='mb-3'>street: ${obj.address.street}</li>
			<li class='mb-3'>suite: ${obj.address.suite}</li>
			<li class='mb-3'>city: ${obj.address.city}</li>
			<li class='mb-3'>zipcode: ${obj.address.zipcode}</li>
				<ul class='mb-3'>geo:
					<li>lat: ${obj.address.geo.lat}</li>
					<li>lng: ${obj.address.geo.lng}</li>
				</ul>
		</ul>
	<p class='mb-1'>phone:  ${obj.Phone}</p>
	<p class='mb-1'>website:  ${obj.website}</p>
		<ul class='mb-1'>company:
			<li class='mb-3'>name: ${obj.company.name}</li>
			<li class='mb-3'>catchPhrase: ${obj.company.catchPhrase}</li>
			<li class='mb-3'>bs: ${obj.company.bs}</li>
		</ul>
	`;


	// var userName = modalWinUser.appendChild(document.createElement('p'));
	// 		userName.className = 'mb-1'
	// 		userName.innerHTML = '<strong>name: </strong>' +  obj.name;
	// var userNick = modalWinUser.appendChild(document.createElement('p'));
	// 	userNick.className = 'mb-1'		
	// 		userNick.innerHTML = '<strong>username: </strong>' +  obj.username;
	// var userEmail = modalWinUser.appendChild(document.createElement('p'));	
	// 	userEmail.className = 'mb-1'	
	// 		userEmail.innerHTML = '<strong>email: </strong>' +  obj.email;	
	// var userAddress = modalWinUser.appendChild(document.createElement('ul'));
	// 		userAddress.innerHTML = '<strong>address: </strong>'
	// 		userAddress.className = 'mb-1'
	// 		var addressUser = userAddress.appendChild(document.createElement('li'));
	// 			addressUser.className = "ml-3";
	// 			addressUser.innerHTML = '<strong>street: </strong>' + obj.address.street;
	// 		var suiteUser = userAddress.appendChild(document.createElement('li'));
	// 			suiteUser.className = "ml-3";
	// 			suiteUser.innerHTML = '<strong>suite: </strong>' + obj.address.suite;
	// 		var cityUser = userAddress.appendChild(document.createElement('li'));
	// 			cityUser.className = "ml-3";
	// 			cityUser.innerHTML = '<strong>city: </strong>' + obj.address.city;			
	// 		var zipcodeUser = userAddress.appendChild(document.createElement('li'));
	// 			zipcodeUser.className = "ml-3";
	// 			zipcodeUser.innerHTML = '<strong>zipcode: </strong>' + obj.address.zipcode;	
	// 		var userGeo = userAddress.appendChild(document.createElement('ul'));
	// 			userGeo.className = "ml-3";
	// 			userGeo.innerHTML = '<strong>geo: </strong>';
	// 			var latUser = userGeo.appendChild(document.createElement('li'));
	// 				latUser.className = "ml-3";
	// 				latUser.innerHTML = '<strong>lat: </strong>' + obj.address.geo.lat;	
	// 			var lngUser = userGeo.appendChild(document.createElement('li'));
	// 				lngUser.className = "ml-3";
	// 				lngUser.innerHTML = '<strong>lng: </strong>' + obj.address.geo.lng;	
	// var userPhone = modalWinUser.appendChild(document.createElement('p'));
	// 	userPhone.className = 'mb-1'		
	// 		userPhone.innerHTML = '<strong>phone: </strong>' +  obj.Phone;
	// var userwebsite = modalWinUser.appendChild(document.createElement('p'));
	// 	userwebsite.className = 'mb-1'		
	// 		userwebsite.innerHTML = '<strong>website: </strong>' +  obj.website;	
	// 	var userCompany = modalWinUser.appendChild(document.createElement('ul'));
	// 		userCompany.innerHTML = '<strong>company: </strong>'	
	// 		var nameCompanyUser = userCompany.appendChild(document.createElement('li'));
	// 			nameCompanyUser.className = "ml-3";
	// 			nameCompanyUser.innerHTML = '<strong>name: </strong>' + obj.company.name;	
	// 		var catchPhraseUser = userCompany.appendChild(document.createElement('li'));
	// 			catchPhraseUser.className = "ml-3";
	// 			catchPhraseUser.innerHTML = '<strong>catchPhrase: </strong>' + obj.company.catchPhrase;	
	// 		var bsUser = userCompany.appendChild(document.createElement('li'));
	// 			bsUser.className = "ml-3";
	// 			bsUser.innerHTML = '<strong>bs: </strong>' + obj.company.bs;
};
function createComment(arr){
	var divPost = this.parentElement.appendChild(document.createElement('ul'));
		divPost.id = 'postIdDel';
		divPost.className = 'list-group';
	
	arr.forEach(function(item){
		var liItem = divPost.appendChild(document.createElement('li'));
			liItem.className = 'list-group-item';

		var userName = liItem.appendChild(document.createElement('p'));
			userName.innerHTML = '<strong>name: </strong>' + item.name;

		var title = liItem.appendChild(document.createElement('p'));
			title.innerHTML = '<strong>email: </strong>' + item.email;

		var body = liItem.appendChild(document.createElement('p'));
			body.innerHTML = '<strong>Comments: </strong>' + item.body;

	});
};
function createList(arr){
	
	arr.forEach(function(item){
		var ulItem = document.getElementById('container1').appendChild(document.createElement('ul'));
			ulItem.className = 'liItem';
		var liItem = ulItem.appendChild(document.createElement('li'));
			liItem.style.position = 'relative';
		var userName = liItem.appendChild(document.createElement('p'));
			userName.innerHTML = item.userId;

		var title = liItem.appendChild(document.createElement('p'));
			title.innerHTML = item.title;

		var body = liItem.appendChild(document.createElement('p'));
			body.innerHTML = item.body;

		var bottomInfo = liItem.appendChild(document.createElement('bottom'));
			bottomInfo.className = "btn btn-info";
			bottomInfo.innerHTML = "Иформация о пользователе";
			bottomInfo.userId = item.userId;
			bottomInfo.addEventListener("click", findUser);

		var bottomComment = liItem.appendChild(document.createElement('bottom'));
			bottomComment.className = "btn btn-primary";
			bottomComment.innerHTML = "Коментарии к посту";
			bottomComment.postId = item.id;
			bottomComment.addEventListener("click", findCommentUser);
	});
	document.getElementById("searchHeader").removeEventListener("click", getPosts);
};

