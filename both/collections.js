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
/*
questionName: questionName,
taglist: taglist,
companylist: companylist,
relatedlist: relatedlist,
srcID: srcID,
srcURL: srcURL,
file: file,
date: date
*/
Questions = new Meteor.Collection("questions");
Questions.allow({
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
