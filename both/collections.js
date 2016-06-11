/*
tagId: tagId,
tagname: tagname,
file: file
*/
Tutorials = new Meteor.Collection("tutorials");
/*
tagname: tagname,
questionlist: questionlist
*/
Tags = new Meteor.Collection("tags");

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

/*
companyname: companyname,
questionlist = questionlist
*/
Companies = new Meteor.Collection("companies");

/*
srcID: srcID,
questionlist = questionlist
*/
SourceIDs = new Meteor.Collection("sourceids");
