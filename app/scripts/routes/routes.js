var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
  },
 
  home_page: function () {

    // $('#full_posts_container').hide();
    // $('#post_feed_container').show();
    // console.log("I'm in the home page");
    new AllView({ collection: all });
    




  },
 
  posts_page: function (id) {
  	// window.wpost = 
    new WholePost({ postid: id, collection: all });

   
 		// $('#post_feed_container').hide();
   //  $('#full_posts_container').show();



    // new Close ({ collection: all });
  },
 	
});
 



