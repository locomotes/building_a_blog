

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

	// idAttribute: "_id",

	// initialize: function () {
	// 	var title = this.get('title');
	// 	var content = this.get('content');
	// 	var date = this.get('date');
	// 	var status = this.get('status');
	// 	var author = this.get('author');
	// 	var taga = this.get('tags');
		
	// }

});

var ALLposts = Backbone.Collection.extend ({
	model: Post, 
	url: "http://tiy-atl-fe-server.herokuapp.com/collections/jblog"
});

var all = new ALLposts(); 

// $("#create_button").click(function() {

	// var post_one = new Post({
	// 		title: "first post",
	// 		content: "Content of the post",
	// 		date: "Today's date",
	// 		status: "Published status",
	// 		author: "Jonathan Dickerson",
	// 		tags: "Generic tag"


	// });

	

// });

console.log('modelsandbottles');







// var AllView = Backbone.View.extend({
	

// 	el: $('#post_feed_container ul'),

// 	initialize: function(){
// 		this.render();
// 	},

// 	render: function(){
		

// 		var template = Handlebars.compile($('#alien_list').html());

// 		var rendered = template({data: this.collection.toJSON()});
// 		console.log(this.collection.toJSON());
// 		this.$el.html(rendered)
// 	}

// });

// all.fetch().done(function () {
// 	new AllView( { collection: all } )

// });

console.log('topofview');

var AllView = Backbone.View.extend({
	

	el: '#blog_container',

	events: {

		"click #create_button": "publishPost",
		// "click #logout: logoutPage"

	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);

		console.log('initializing');
	},

	render: function(){

		var template = Handlebars.compile($('#posts_list').html());

		var rendered = template({data: this.collection.toJSON()});

		console.log(this.collection.toJSON());

		this.$el.find("#post_feed_container ul").trigger('reset').html(rendered);
		return this;

		console.log('rendering');

	},

	publishPost: function(e){

	e.preventDefault();
	console.log("circle of life");
		var post_one = new Post({
			title: $('#input_title').val(),
			content: $('#input_post').val(),
			date: "date",
			status: "published",
			author: $('#input_author').val(),
			tags: $('#input_tags').val()

		});

		all.add(post_one).save();
		console.log('post_one');		

	},

	

	// logoutPage: function(){
	// 	new LogOutView();
	// }

});

// all.fetch().done(function () {
	// new AllView( { collection: all } )

// });


// $(".octicon-diff-renamed").click(function () {
// 	var todo = new ToDo ({
// 		new_entry:$('#new_entry').val()
// 	});
// 		$(".aggregate").append(todotemplate(todo));

// 		item.push(todo);
// 		// console.log(item);

// $("#create_button").click(function() {
// 	var post_one = new Post({

// 	title: $('#input_title').val()

// 	});
// 	all.add(post_one).save();
// 	console.log(post_one);
// });

all.fetch().done(function () {
	new AllView( { collection: all });
});