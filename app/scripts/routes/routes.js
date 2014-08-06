var PageRouter = Backbone.Router.extend({

  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
    "login": "login_page"
  },
 
  initialize: function () {
    this.appView = new AppView();
  },


  home_page: function () {
    if(!currentUser) return window.post_router.navigate('login', {trigger: true});
    showUser(currentUser);
    var homeview = new AllView({ collection: all });
    this.appView.showView(homeview);

  },
 
  posts_page: function (id) {
    if(!currentUser) return window.post_router.navigate('login', {trigger: true});
  	// window.wpost = 
    var postview = new WholePost({ postid: id, collection: all });
    this.appView.showView(postview);

  },

 	login_page: function () {
    if(currentUser) return window.post_router.navigate('', {trigger: true});
    new SignIn();

    // this.appView.showView(signIn);
  }

});
 




