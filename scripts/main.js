var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
  },
 
  home_page: function () {
    $('#full_posts_container').hide();
    $('#post_feed_container').show();
    console.log("I'm in the home page");
  },
 
  posts_page: function () {
  	new WholePost({ collection: all });
   //  $('#post_feed_container').hide();
   //  $('#full_posts_container').show();
  
  },
 	
});
 




var Post = Backbone.Model.extend ({
	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: ''
	},



});

var ALLposts = Backbone.Collection.extend ({
	model: Post, 
	url: "http://tiy-atl-fe-server.herokuapp.com/collections/jblog"
});

var all = new ALLposts(); 







var WholePost = Backbone.View.extend({

	el: '#blog_container',

	events: {

		// "click #post_feed_container ul": "fullPost",
	},

	initialize: function(){
		console.log("Whole Post Loaded");
		this.render();
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
    console.log("initialize");
	},

	render: function(){
		var template = Handlebars.compile($('#entire_posts').html());
		console.log(this.collection);
		var rendered = template({data: this.collection.toJSON()});

		this.$el.find("#post_feed_container ul").trigger('reset').html(rendered);
		return this;
		console.log("rendering");
	},

	
});


















































var AllView = Backbone.View.extend({
	

	el: '#blog_container',

	events: {

		"click #create_button": "publishPost",
		"click #post_feed_container ul a": "wholePost"

	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);

	},

	render: function(){
		var template = Handlebars.compile($('#posts_list').html());
		var rendered = template({data: this.collection.toJSON()});

		this.$('#full_posts_container').hide();
    this.$('#post_feed_container').show();

		console.log(this.collection.toJSON());

		this.$el.find("#post_feed_container ul").trigger('reset').html(rendered);
		return this;


	},

	publishPost: function(e){
	e.preventDefault();

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

	

	wholePost: function(e){
		e.preventDefault();
		var post_id = $(e.target).attr('id');
		console.log(e.target);
		console.log(post_id);
		window.post_router.navigate('#posts_page/'+post_id, {trigger: true});
	}

});
// var drink_id = $(event.target).attr('id');
// window.whiskey_router.navigate('#edit/'+drink_id, {trigger: true});

// post_router.navigate''



all.fetch().done(function () {
	new AllView( { collection: all });
	window.post_router = new PageRouter();
	Backbone.history.start();

});





// whiskey_list.fetch().done( function (){
//   // Define Global Router && Start History
//   window.whiskey_router = new WhiskeyRouter();
//   Backbone.history.start();
// });