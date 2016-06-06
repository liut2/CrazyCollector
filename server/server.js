Meteor.startup(() => {
  // code to run on server at startup
  Tags.remove();
  if (Tags.find().count() == 0) {
	  var taglist = ["Binary1", "Binary2", "Binary3", "Binary4", "Binary5"];
	  for (var i = 0; i < taglist.length; i++) {
		 Tags.insert({
			 tagname: taglist[i]
		 });
	  }
  }

});
