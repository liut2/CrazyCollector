Router.configure({
    layoutTemplate: "appLayout"
});

Router.route("/post", {
    name : "post",
    template : "post"
});

Router.route("/", {
    name : "main",
    template : "main"
});

Router.route('/tags/<tagname>', {
    data: function(){
        console.log("This is a tags page.");
    }
});
