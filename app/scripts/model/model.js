

var Post = Parse.Object.extend ({

	className: "Blog_posts",

	idAttribute: "objectId",

	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: '',
		user: Parse.User.current(),
		ACL: new Parse.ACL(Parse.User.current())
	}



});

var ALLposts = Parse.Collection.extend ({
	model: Post 
	
});
// 
// var all = new ALLposts(); 






