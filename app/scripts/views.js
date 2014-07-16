
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

