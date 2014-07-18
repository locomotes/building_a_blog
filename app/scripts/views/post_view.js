var WholePost = Backbone.View.extend({

	el: '#blog_container',

	events: {

		// "click #post_feed_container ul": "fullPost",
	},

	initialize: function(a){
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
    this.options = a;
    this.render();
	},

	render: function(){
		// var rendered = template({data: this.collection.toJSON()});
		var single = this.collection.get(this.options.postid);
		var template = Handlebars.compile($('#entire_posts').html());
		var rendered = template(single.toJSON());
		// this.$el.find("#full_posts_container ul").trigger('reset').html(rendered);
		console.log(rendered);
		this.$el.prev().html('');
    this.$el.html(rendered);
    return this;
	},

	
});


 // this.$el.find(#full_posts_container);













































