var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
  },
 
  home_page: function () {
    // $('#full_posts_container').hide();
    // $('#post_feed_container').show();
    console.log("I'm in the home page");
  },
 
  posts_page: function (id) {
  	new WholePost({ postid: id, collection: all });
   
 		// $('#post_feed_container').hide();
   //  $('#full_posts_container').show();
  },
 	
});
 



