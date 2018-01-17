var findModule = (function(){

	var searchHeader = document.getElementById("searchHeader");
		searchHeader.addEventListener("click", getPosts);

	var store = [];
	var urlApi = 'https://jsonplaceholder.typicode.com/';
	var getClassLoadStop;
	var btn;

function getPosts () {
		loaderGif(event.target);
		fetch(urlApi + 'posts')
		.then(function(response) {
			return response.json();
		})
		.then(createList)
		.then(renderList);
};//РАБОТАЕТ!!!//РАБОТАЕТ!!!//РАБОТАЕТ!!!

function getUserInfo (userId){
	
	if (getPostInfo(userId)) return;

	fetch(urlApi + 'users/' + userId)
	.then(function(response) {return response.json();})
	.then(createUser.bind(btn, userId));
};

function findUser () {
	var infoDelete = document.getElementById("modalWin");

	if(infoDelete){
		infoDelete.parentElement.removeChild(infoDelete);
		return;
	} else loaderGif(event.target);

	btn = this;
	userId = this.userId;

	getUserInfo(userId);
};

function findCommentUser () {
	var postDelete = event.target.parentElement.querySelector("#postIdDel");

	if(postDelete){
		postDelete.parentElement.removeChild(postDelete);
		return;
	}else loaderGif(event.target);

	var btn = this;
	var idCom = this.postId;

	function getUserInfoCom (userIdCom){
		fetch(urlApi + 'posts/' + idCom + '/comments')
		.then(function(response) {return response.json();})
		.then(createComment.bind(btn));
	};

	getUserInfoCom(idCom);
};/////Запрос КОММЕНТАРИЙ!!!

function getPostInfo(userId) {
	return store.some(item => { return item.id === userId && item.postInfo; });
};

function createUser (userId, obj) {
	var postInfo = obj;
	console.log(store);
	store.forEach(item => {
		if (item.id === userId) {
			item.postInfo = postInfo;
		}
	});

	var btn = this.parentElement
	
	var modalWinUser = document.createElement('div');
	if(this.parentElement.getElementsByTagName('ul')[0]){
		this.parentElement.insertBefore(modalWinUser, this.parentElement.getElementsByTagName('ul')[0])
	} else{
		this.parentElement.appendChild(modalWinUser);
	}
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
	getClassLoadStop.parentElement.removeChild(getClassLoadStop);
};

function createComment(arr){
	var divPost = this.parentElement.appendChild(document.createElement('ul'));
	divPost.id = 'postIdDel';
	divPost.className = 'list-group';
	var fragment = document.createDocumentFragment();
	
	arr.forEach(function(item){
		var liItem = fragment.appendChild(document.createElement('li'));
		liItem.className = 'list-group-item';

		var userName = liItem.appendChild(document.createElement('p'));
		userName.innerHTML = '<strong>name: </strong>' + item.name;

		var title = liItem.appendChild(document.createElement('p'));
		title.innerHTML = '<strong>email: </strong>' + item.email;

		var body = liItem.appendChild(document.createElement('p'));
		body.innerHTML = '<strong>Comments: </strong>' + item.body;

	});
	divPost.appendChild(fragment);
	getClassLoadStop.parentElement.removeChild(getClassLoadStop);
};/////РЕНДЕР КОММЕНТАРИЙ!!!
function createList(arr) {
	store = arr;
};//РАБОТАЕТ!!!//РАБОТАЕТ!!!//РАБОТАЕТ!!!
function renderList(){
	var ulItem = document.getElementById('container1').appendChild(document.createElement('ul'));

		ulItem.className = 'liItem';
		
		var fragment = document.createDocumentFragment();
	
	store.forEach(function(item){
		
		var liItem = fragment.appendChild(document.createElement('li'));
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
	ulItem.appendChild(fragment);
	searchHeader.removeEventListener("click", getPosts);
	getClassLoadStop.parentElement.removeChild(getClassLoadStop);
};//РАБОТАЕТ!!!//РАБОТАЕТ!!!//РАБОТАЕТ!!!
function loaderGif(target){
	// console.log(target);
	var loader = target.parentElement.appendChild(document.createElement('div'));
		loader.className = 'loadStop';
		getClassLoadStop = document.getElementsByClassName('loadStop')[0];
		// console.log(getClassLoadStop);
		if(target.id === 'searchHeader') {
			loader.innerHTML = `<img src="images/loader.gif" style="width:200px;height:200px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;">`;
		};
		if (target.innerHTML === 'Иформация о пользователе') {
			loader.innerHTML = `<img src="images/loader.gif" style="width:50px;height:50px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;">`;
		}
		if (target.innerHTML === 'Коментарии к посту') {
			loader.innerHTML = `<img src="images/loader.gif" style="width:50px;height:50px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;">`;
		}
};//РАБОТАЕТ!!!//РАБОТАЕТ!!!//РАБОТАЕТ!!!
})();
