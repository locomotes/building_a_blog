var SignIn = Backbone.View.extend({

	el: '#blog_container',

	events: {
		"submit form": 'signUpUser',
		"click #signIn": 'loginUser'
	},

	initialize: function(){
		// this.render();
	},

	render: function() {
			//if Parse.use
		console.log("I'm in login view");
		this.$('#full_posts_container').hide();
		this.$('#post_feed_container').hide();
		this.$('#login_container').hide();

		return this;
	},


	signUpUser: function(e) {
		console.log('inside');
		e.preventDefault();
		var user = new Parse.User();
		user.set("username", $("#name").val());
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

	loginUser: function(e) {
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

