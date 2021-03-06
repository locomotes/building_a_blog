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

  }

});
 







var Post = Parse.Object.extend ({

	className: "Blog_posts",

	idAttribute: "objectId",

	defaults: {
		title: '',
		content: '',
		date: '',
		status: '',
		author: '',
		tags: ''

	}



});

var ALLposts = Parse.Collection.extend ({
	model: Post 
	
});








var SignIn = Backbone.View.extend({

	el: '#login_container',

	events: {
		"submit .form1": 'signUpUser',
		"submit .form2": 'logInUser'
	},

	initialize: function(){
		this.render();
		console.log('loginview initialized');
	},

	render: function() {
		$('#full_posts_container').hide();
		$('#post_feed_container').hide();
		$('#background').hide();
		$('footer').hide();

		$('#login_container').show();

		return this;
	},


	signUpUser: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.set("username", $("#uname").val());
		user.set("password", $("#password").val());
		user.set("email", $("#email").val());


		user.signUp(null, {
		  success: function(user) {
		    // Go HOME
		    currentUser = Parse.User.current();
        window.post_router.navigate("", { trigger: true });
		    console.log('signedUp');
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    console.log("Error: " + error.code + " " + error.message);
		  }
		});

		$(this).trigger('reset');
	},

	logInUser: function(e) {
		e.preventDefault();
		var myname = $("#rname").val();
		var mypass = $("#rpassword").val();
		Parse.User.logIn(myname, mypass, {
		  success: function(user) {
		    // Go HOME dude
		    currentUser = Parse.User.current();
		    window.post_router.navigate("", { trigger: true });
		    console.log("Im Logged In");
		  },
		  error: function(user, error) {
		    // The login failed. Check error to see why.
		  }
		});

		$(this).trigger('reset');
	}



});


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
    console.log('posts page initialized');
    // this.collection.on('change', this.close, this);
	},

	render: function(){
		console.log("I'm in post view");
		this.$('#full_posts_container').show();
		this.$('#post_feed_container').hide();
		this.$('#login_container').hide();
		// var rendered = template({data: this.collection.toJSON()});
		// var single = this.collection.get(this.options.postid);
		var template = Handlebars.compile($('#entire_posts').html());
		var rendered = template(this.single.toJSON());
		// this.$el.find("#full_posts_container ul").trigger('reset').html(rendered);
		
		this.$el.prev().html('');
    this.$el.find('#full_posts_container ul').html(rendered);

    // $("#background").removeClass("no-bg");
    $("#background").addClass("no-bg");

    return this;

	},

	deletePost: function (event) {
		event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
    

      this.single.destroy({success: function () {
        window.post_router.navigate("", { trigger: true });
      }});
      // this.single.on('change', this.unbind, this);
      // // this.$(WholePost).remove();
      // this.$el.remove('#full_posts_container ul').html();
		}
	}
});
















































var AllView = Backbone.View.extend({
	

	el: '#blog_container',

	events: {

		
		"click #post_feed_container ul a": "wholePost"

	},

	initialize: function(){
		this.render();
		this.collection.on('change', this.render, this);
    this.collection.on('destroy', this.render, this);
    console.log("home page initialized");
    this.collection.on('add', this.render, this);
    console.log('loginview initialized');
	},

	render: function(){
		console.log('Im home');
		var template = Handlebars.compile($('#posts_list').html());
		var rendered = template({data: this.collection.toJSON()});

		$('#full_posts_container').hide();
    $('#post_feed_container').show();
    $('#login_container').hide();
    $('#background').show();
		$('footer').show();

		this.$el.find("#post_feed_container ul").html(rendered);

		// $("#background").addClass("no-bg");
		$("#background").removeClass("no-bg");

		return this;


	},

	

	

	wholePost: function(e){
		e.preventDefault();
		var post_id = $(e.target).attr('id');
		console.log(e.target);
		console.log(post_id);
		window.post_router.navigate('#posts_page/'+post_id, {trigger: true});
	}

});



Parse.initialize("cQGSVouVSHtCsQpSv0kuKa7GFm1pya0X0C4uEos9", "Y5Z9J9XWb3DIgBd7KI6qUqZBxw3U15LBRzScQ3Mx");

var currentUser = Parse.User.current();


var all = new ALLposts(); 


var AppView = function (){
  this.showView = function(view) {
    if (this.currentView){
      this.currentView.remove();
    }

    this.currentView = view;
    this.currentView.render();

    $('#zombie').html(this.currentView.el);
  }
}

all.fetch().done(function () {
	// new AllView( { collection: all });
	window.post_router = new PageRouter();
	Backbone.history.start();

});




$('#main').on('submit', function() {

  var post_one = new Post({
    title: $('#input_title').val(),
    content: $('#input_post').val(),
    date: new Date().toJSON().slice(0,10),
    status: "Published",
    author: $('#input_author').val(),
    tags: $('#input_tags').val(),
    user: Parse.User.current(),
    ACL: new Parse.ACL(Parse.User.current())
  });

  post_one.save(null, {
    success: function(post_one) {
      alert("success");
      all.add(post_one);
      $('#main').trigger('reset');
    }
  });
});

var showUser = function (user) {
  var name = user.get('username');
  $('#userfield').text(name);
};

$('#user_logout button').on('click', function () {
  Parse.User.logOut();
  currentUser = Parse.User.current();
  window.post_router.navigate('login', {trigger: true});
});

console.log(currentUser);

