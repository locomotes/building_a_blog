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
















































