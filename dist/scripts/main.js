var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
  },
 
  home_page: function () {
    // $('#full_posts_container').hide();
    // $('#post_feed_container').show();
    // console.log("I'm in the home page");
    new AllView({ collection: all });
  },
 
  posts_page: function (id) {
  	new WholePost({ postid: id, collection: all });
   
 		// $('#post_feed_container').hide();
   //  $('#full_posts_container').show();
  },
 	
});
 






var Post = Backbone.Model.extend ({
	
	idAttribute: "_id",

	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: ''
	}



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
		'click .delete' :'deletePost'
	},

	initialize: function(a){
		this.collection.on('change', this.render, this);
    this.options = a;
    this.single = this.collection.get(this.options.postid);
    this.render();
    this.collection.on('destroy', this.render, this);
	},

	render: function(){
		this.$('#full_posts_container').show();
		this.$('#post_feed_container').hide();
		// var rendered = template({data: this.collection.toJSON()});
		// var single = this.collection.get(this.options.postid);
		var template = Handlebars.compile($('#entire_posts').html());
		var rendered = template(this.single.toJSON());
		// this.$el.find("#full_posts_container ul").trigger('reset').html(rendered);
		
		this.$el.prev().html('');
    this.$el.find('#full_posts_container ul').html(rendered);
    return this;
	},

	deletePost: function (event) {
		console.log("test");
		event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
    

      this.single.destroy({success: function () {
        window.post_router.navigate("", { trigger: true });
      }});

		}
	}
});


 // this.$el.find(#full_posts_container);















































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
		console.log('Im home');
		var template = Handlebars.compile($('#posts_list').html());
		var rendered = template({data: this.collection.toJSON()});

		this.$('#full_posts_container').hide();
    this.$('#post_feed_container').show();

		this.$el.find("#post_feed_container ul").trigger('reset').html(rendered);
		return this;


	},

	publishPost: function(e){
	e.preventDefault();

		var post_one = new Post({
			title: $('#input_title').val(),
			content: $('#input_post').val(),
			date: new Date().toJSON().slice(0,10),
			status: "Published",
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