var PageRouter = Backbone.Router.extend({
 
  routes: {
    "": "home_page",
    "posts_page/:id": "posts_page",
    "login": "login_page"
  },
 
  initialize: function () {
    this.appView = new AppView();
    console.log(this.appView);
  },


  home_page: function () {
    if(!currentUser) return window.post_router.navigate('login', {trigger: true});
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
    new SignIn();
    (currentUser) return window.post_router.navigate("", {trigger: true});
    // this.appView.showView(login);
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
// 
// var all = new ALLposts(); 







var SignIn = Backbone.View.extend({

	el: '#login_container',

	events: {
		"submit .form1": 'signUpUser',
		"submit .form2": 'logInUser'
	},

	initialize: function(){
		this.render();
	},

	render: function() {
			//if Parse.use
		console.log("I'm in login view");
		$('#full_posts_container').hide();
		$('#post_feed_container').hide();
		$('#background').hide();
		$('footer').hide();

		return this;
	},


	signUpUser: function(e) {
		console.log('inside');
		// e.preventDefault();
		var user = new Parse.User();
		console.log($("#uname").val());
		user.set("username", $("#uname").val());
		user.set("password", $("#password").val());
		user.set("email", $("#email").val());


		user.signUp(null, {
		  success: function(user) {
		    // Go HOME
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
		console.log('logInUser');
		e.preventDefault();
		Parse.User.logIn(myname, mypass, {
		  success: function(user) {
		    // Go HOME dude
		    console.log("Signed In");
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
    console.log("posts page initialized");
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
	},

	render: function(){
		console.log('Im home');
		var template = Handlebars.compile($('#posts_list').html());
		var rendered = template({data: this.collection.toJSON()});

		$('#full_posts_container').hide();
    $('#post_feed_container').show();
    $('#login_container').hide();

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


// var drink_id = $(event.target).attr('id');
// window.whiskey_router.navigate('#edit/'+drink_id, {trigger: true});

// post_router.navigate''

Parse.initialize("cQGSVouVSHtCsQpSv0kuKa7GFm1pya0X0C4uEos9", "Y5Z9J9XWb3DIgBd7KI6qUqZBxw3U15LBRzScQ3Mx");

var currentUser = Parse.User.current();


var all = new ALLposts(); 


var AppView = function (){
  this.showView = function(view) {
    console.log(this.showView);
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
      tags: $('#input_tags').val()
      

    });

    post_one.save(null, {
      success: function(post_one) {
        alert("success");
        all.add(post_one);
        $('#main').trigger('reset');
      }
    });

      
  });

// "submit #main": "publishPost",

// publishPost: function(e){
//     alert("in publish post function");
//     e.preventDefault();

//     $('#main').on('submit');

//     var post_one = new Post({
//       title: $('#input_title').val(),
//       content: $('#input_post').val(),
//       date: new Date().toJSON().slice(0,10),
//       status: "Published",
//       author: $('#input_author').val(),
//       tags: $('#input_tags').val()
      

//     });

//     post_one.save(null, {
//       success: function(post_one) {
//         alert("success");
//         all.add(post_one);
//         $('#main').trigger('reset');
//       }
//     });

      
//   },





