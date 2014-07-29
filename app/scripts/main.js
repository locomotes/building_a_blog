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

// var showUser = function (user) {
//   var name = user.get('username');
//   $('.userfield').text(name);
// };





