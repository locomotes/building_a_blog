

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
