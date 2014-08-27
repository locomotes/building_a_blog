
var AllView = Backbone.View.extend({
	

	el: '#blog_container',

	events: {

		
		"click #post_feed_container ul a": "wholePost"

	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
    console.log("home page initialized");
    this.collection.on('add', this.render, this);
    console.log('loginview initialized');
	},

	render: function(){
		console.log('Im home');
		var template = Handlebars.compile($('#posts_list').html());
		var rendered = template({data: this.collection.toJSON()});

		$('#full_posts_container').hide();
    $('#post_feed_container').show();
    $('#login_container').hide();
    $('#background').show();
		$('footer').show();

		this.$el.find("#post_feed_container ul").html(rendered);

		// $("#background").addClass("no-bg");
		$("#background").removeClass("no-bg");

		return this;


	},

	

	

	wholePost: function(e){
		e.preventDefault();
		var post_id = $(e.target).attr('id');
		console.log(e.target);
		console.log(post_id);
		window.post_router.navigate('#posts_page/'+post_id, {trigger: true});
	}

});


