
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

var AllView = Backbone.View.extend({
	

	el: $('#post_feed_container ul'),

	initialize: function(){
		this.render();
	},

	render: function(){

		var template = Handlebars.compile($('#posts_list').html());

		var rendered = template({data: this.collection.toJSON()});

		console.log(this.collection.toJSON());

		this.$el.html(rendered)
	}

});

all.fetch().done(function () {
	new AllView( { collection: all } )

});