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
