

var Blog = Backbone.Model.extend ({

	idAttribute: "_id",

	initialize: function () {
		var name = this.get('name');
		console.log( name + ' is an Earth transplant.' );
	}

});

var ALLaliens = Backbone.Collection.extend ({
	model: Alien, 
	url: "http://tiy-atl-fe-server.herokuapp.com/collections/students"
});

var all = new ALLaliens(); 


var allView = Backbone.View.extend({
	template: function(model){
		return _.template($('#alien_list').html());
	},

	el: $('#post_feed_container ul'),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html(this.template(this.collection))
	}

});


all.fetch().done(function () {
	new allView( { collection: all} )

});
// all.fetch().done(function(){
// 	new videoView({collection: all})



// });
