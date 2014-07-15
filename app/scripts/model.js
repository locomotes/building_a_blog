

// var Alien = Backbone.Model.extend ({
// 	defaults: {
// 		name: '',
// 		location: 'Earth',
// 		native_planet: 'Mars'
// 	},

// 	idAttribute: "_id",

// 	initialize: function () {
// 		var name = this.get('name');
// 		console.log( name + ' is an Earth transplant.' );
// 	}

// });

// var ALLaliens = Backbone.Collection.extend ({
// 	model: Alien, 
// 	url: "http://tiy-atl-fe-server.herokuapp.com/collections/jon"
// });

// var all = new ALLaliens(); 


var Post = Backbone.Model.extend ({
	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: ''
	},

	idAttribute: "_id",

	initialize: function () {
		var title = this.get('title');
		var content = this.get('content');
		var date = this.get('date');
		var status = this.get('status');
		var author = this.get('author');
		var taga = this.get('tags');
		
	}

});

var ALLposts = Backbone.Collection.extend ({
	model: Post, 
	url: "http://tiy-atl-fe-server.herokuapp.com/collections/jblog"
});

var all = new ALLposts(); 

var post_one = new Post({
	title: "first post",
		content: "Content of the post",
		date: "Today's date",
		status: "Published status",
		author: "Jonathan Dickerson",
		tags: "Generic tag"
});

all.add(post_one).save();

console.log(post_one);


