Template.post.helpers({

});

Template.post.events({
	"click #done": function(event, template){
		var editor = ace.edit("archy");
		var file = editor.getValue();
	}
});
