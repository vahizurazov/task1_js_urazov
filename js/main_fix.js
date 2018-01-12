var findModule = (function(){
	document.getElementById("searchHeader").addEventListener("click", getPosts);

	var store = [];
function getPosts(){

		fetch('https://jsonplaceholder.typicode.com/posts')
		.then((response) => response.json())
		.then(createList);
};
function findUser () {
	
	if(document.getElementById("modalWin")){
		document.getElementById("modalWin").parentElement.removeChild(document.getElementById("modalWin"));
		return;
	}

	var btn = this;
	userId = this.userId;

	function getUserInfo (userId){

		fetch('https://jsonplaceholder.typicode.com/users/' + userId)
		.then((response) => response.json())
		.then(createUser.bind(btn));
	};
	getUserInfo(userId);
};
function findCommentUser () {
	var postDelete = event.target.parentElement.querySelector("#postIdDel");
	if(postDelete){
		postDelete.parentElement.removeChild(postDelete);
		return;
	}
	var btn = this;
	var idCom = this.postId;
	function getUserInfoCom (userIdCom){

		fetch('https://jsonplaceholder.typicode.com/posts/' + idCom + '/comments')
		.then((response) => response.json())
		.then(createComment.bind(btn));
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

		var title = liItem.appendChild(document.createElement('p'));
		title.innerHTML = '<strong>Title: </strong>' + item.title;

		var body = liItem.appendChild(document.createElement('p'));
		body.innerHTML = '<strong>Body: </strong>' + item.body;

		var bottomInfo = liItem.appendChild(document.createElement('bottom'));
		bottomInfo.className = "btn btn-info";
		bottomInfo.style.margin = '0 50px 0 0'
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
})();
