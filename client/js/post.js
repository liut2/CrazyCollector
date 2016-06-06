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
		//get document content
		var editor = ace.edit("archy");
		var file = editor.getValue();
		//insert into Questions collection
		if (questionName == "" || srcID == "" || taglist.length == 0) {
			alert("Are you sure you want submit?");
			return;
		}
		var qid = Questions.insert({
			questionName: questionName,
			srcID: srcID,
			srcURL: srcURL,
			taglist: taglist,
			companylist: companylist,
			file: file,
			date: new Date()
		});
		//also insert question id into Tags collection
		for (var i = 0; i < taglist.length; i++) {
			var tagObj = Tags.findOne({tagname: taglist[i]});
			if (tagObj == null) {
				console.log("should only enter once.");
				var questionlist = [];
				questionlist.push(qid);
				Tags.insert({
					tagname: taglist[i],
					questionlist: questionlist
				});
			}else {
				var questionlist = tagObj.questionlist;
				questionlist.push(qid);
				Tags.update({_id: tagObj._id}, {$set:{
					questionlist: questionlist
				}});
			}
		}
		//also insert question id into Companies collection
		for (var i = 0; i < companylist.length; i++) {
			var companyObj = Companies.findOne({companyname: companylist[i]});
			if (companyObj == null) {
				var questionlist = [];
				questionlist.push(qid);
				Companies.insert({
					companyname: companylist[i],
					questionlist: questionlist
				});
			}else {
				var questionlist = companyObj.questionlist;
				questionlist.push(qid);
				Companies.update({_id: companyObj._id}, {$set:{
					questionlist: questionlist
				}});
			}
		}
		//also insert question id into srcID collection
		var srcObj = SourceIDs.findOne({srcID: srcID});
		if (srcObj == null) {
			var questionlist = [];
			questionlist.push(qid);
			SourceIDs.insert({
				srcID: srcID,
				questionlist: questionlist
			});
		}else {
			var questionlist = srcObj.questionlist;
			questionlist.push(qid);
			SourceIDs.update({_id: srcObj._id}, {$set:{
				questionlist: questionlist
			}});
		}
		//reset session vars
		Session.set("tagSession", []);
		Session.set("companySession", []);
		Session.set("srcIDSession", "");
		template.find("#question_name").value = "";
		template.find("#source_url").value = "";
		Materialize.toast('You have successfully submitted your question.', 2000);
		Router.go("main");
	}
});
