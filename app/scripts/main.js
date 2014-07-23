Parse.initialize("cQGSVouVSHtCsQpSv0kuKa7GFm1pya0X0C4uEos9", "Y5Z9J9XWb3DIgBd7KI6qUqZBxw3U15LBRzScQ3Mx");


var all = new ALLposts(); 


all.fetch().done(function () {
	// new AllView( { collection: all });
	window.post_router = new PageRouter();
	Backbone.history.start();

});




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

