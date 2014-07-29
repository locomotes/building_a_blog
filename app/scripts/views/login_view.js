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
		e.preventDefault();
		var user = new Parse.User();
		console.log($("#uname").val());
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
		console.log('logInUser');
		// e.preventDefault();
		var myname = $("#rname").val();
		var mypass = $("#rpassword").val();
		Parse.User.logIn(myname, mypass, {
		  success: function(user) {
		    // Go HOME dude
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

