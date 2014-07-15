

var Alien = Backbone.Model.extend ({
	defaults: {
		name: '',
		location: 'Earth',
		native_planet: 'Mars'
	},

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


