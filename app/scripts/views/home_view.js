
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
