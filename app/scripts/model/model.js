

var Post = Parse.Object.extend ({

	className: "Blog_posts",

	idAttribute: "objectId",

	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: ''
	}



});

var ALLposts = Parse.Collection.extend ({
	model: Post, 
	
});

var all = new ALLposts(); 






