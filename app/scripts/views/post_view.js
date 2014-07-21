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













































