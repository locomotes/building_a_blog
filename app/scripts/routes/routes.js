var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page"
  },
 
  intialize: function () {
    this.appView = new AppView();
  },

  home_page: function () {

    var homeview = new AllView({ collection: all });
    this.appView.showView(homeview);

  },
 
  posts_page: function (id) {
  	// window.wpost = 
    var postview = new WholePost({ postid: id, collection: all });
    this.appView.showView(postview);

  }
 	
});
 




