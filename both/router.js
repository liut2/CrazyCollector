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

Router.route('/tags/:_id', {
	template: "specview"
});

Router.route('/companies/:_id', {
	template: "specview"
});

Router.route('/sources/:_id', {
	template: "specview"
});

Router.route('/dates/:int', {
	template: "specview"
});
