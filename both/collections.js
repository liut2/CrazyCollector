/*
id: id,
tagname: tagname
*/
Tags = new Meteor.Collection("tags");
Tags.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	}
});
