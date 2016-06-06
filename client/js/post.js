Template.post.events({
	"click #done": function(event, template){
		event.preventDefault();
		//get name
		var questionName = template.find("#question_name").value.trim();
		//get source
		var srcID = Session.get("srcIDSession");
    	var srcURL = template.find("#source_url").value.trim();
		//get taglist
		var taglist = Session.get("tagSession");
		//get companylist
		var companylist = Session.get("companySession");
		//get relatedlist
		var relatedlist = Session.get("relatedSession");
		//get document content
		var editor = ace.edit("archy");
		var file = editor.getValue();
		//insert into Question collection
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
		Questions.insert({
			questionName: questionName,
			srcID: srcID,
			srcURL: srcURL,
			taglist: taglist,
			companylist: companylist,
			relatedlist: relatedlist,
			file: file,
			date: new Date()
		});
		console.log("insert done");
	}
});
