var array = ["Today", "Last Three Days", "Last Week", "Last Two Weeks", "Last Month"];
Session.setDefault("qidSelected", null);
Session.setDefault("ifEditMode", false);

Template.specview.helpers({
	"filter" : function(){
		var path = Iron.Location.get().path;
		var split = path.split("/");
		var filter = split[1];
		var id = split[2];
		return filter.charAt(0).toUpperCase() + filter.slice(1);
	},
	"name" : function(){
		var path = Iron.Location.get().path;
		var split = path.split("/");
		var filter = split[1];
		var id = split[2];
		switch (filter) {
			case "tags":
				return Tags.findOne({"_id" : id}).tagname;
			case "companies":
				return Companies.findOne({"_id": id}).companyname;
			case "sources":
				return SourceIDs.findOne({"_id" : id}).srcID;
			case "dates":
				return array[parseInt(id)];
			default:
				break;
		}
	},
	"questionlist" : function(){
		var path = Iron.Location.get().path;
		var split = path.split("/");
		var filter = split[1];
		var id = split[2];
		switch (filter) {
			case "tags":
				return Tags.findOne({"_id" : id}).questionlist;
			case "companies":
				return Companies.findOne({"_id": id}).questionlist;
			case "sources":
				return SourceIDs.findOne({"_id" : id}).questionlist;
			case "dates":
				var date;
				if (id === "0") {
					//then it's today
					date = new Date();
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);

				} else if (id === "1") {
					date = new Date();
					date = date - 1000 * 60 * 60 * 24 * 3;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
					date = new Date(date);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);

				} else if (id === "2") {
					date = new Date();
					date = date - 1000 * 60 * 60 * 24 * 7;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
					date = new Date(date);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
				} else if (id === "3") {
					date = new Date();
					date = date - 1000 * 60 * 60 * 24 * 14;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
					date = new Date(date);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
				} else if (id === "4") {
					date = new Date();
					date = date - 1000 * 60 * 60 * 24 * 30;   // current date's milliseconds - 1,000 ms * 60 s * 60 mins * 24 hrs * (# of days beyond one to go back)
					date = new Date(date);
					date.setHours(0);
					date.setMinutes(0);
					date.setSeconds(0);
				}
				var result = [];
				var cursor = Questions.find({date: {$gte: date}}, {sort: {date: -1}});
				console.log(cursor.count());
				cursor.forEach(function(doc){
					console.log(doc._id);
					result.push(doc._id);
				});
				return result;
			default:
				break;
		}
	},
	"questionName" : function(){
		return Questions.findOne({_id: this.toString()}).questionName;
	},
	"isTags": function(){
		var path = Iron.Location.get().path;
		var split = path.split("/");
		var filter = split[1];
		return filter === "tags";
	},
	"notEditMode" : function(){
		return !Session.get("ifEditMode");
	},
	"alreadyTags" : function(){
		var active = document.getElementById("act");
		if (active != null) {
			var content = active.textContent;
			if (content === "Tutorial") {
				return [];
			} else {
				var taglist = Questions.findOne({"questionName": content}).taglist;
				return taglist;
			}
		}
		return [];
	},
	"alreadyCompanies" : function(){
		var active = document.getElementById("act");
		if (active != null) {
			var content = active.textContent;
			if (content === "Tutorial") {
				return [];
			} else {
				var taglist = Questions.findOne({"questionName": content}).companylist;
				return taglist;
			}
		}
		return [];
	}
});

Template.specview.events({
	"click .collection-item": function(event, template){
		//remove previous active
		var previousSelected = document.getElementById("act");
		if (previousSelected != null) {
			previousSelected.removeAttribute("id");
		}
		//add to new one
		var curNode = event.target;
		var content = curNode.textContent;
		curNode.setAttribute("id", "act");
		if (content === "Tutorial") {
			var path = Iron.Location.get().path;
			var split = path.split("/");
			var tagId = split[2];
			var file = Tutorials.findOne({"tagId" : tagId}).file;
			console.log("clicked tutorial");
			var editor = ace.edit("viewarchy");
			editor.setValue("");
			editor.insert(file);
		} else {
			Session.set("qidSelected", this.toString());
			//reload editor content
			var qid = Session.get("qidSelected");
			var file = Questions.findOne({"_id" : qid}).file;
			var editor = ace.edit("viewarchy");
			editor.setValue("");
			editor.insert(file);
		}
	},
	"click #editButton": function(e, t){
		Session.set("ifEditMode", true);
	},
	"click #abortButton": function(e, t){
		Session.set("ifEditMode", false);
	},
	"click #saveButton" : function(e, t) {
		var active = document.getElementById("act");
		if (active != null) {
			var content = active.textContent;
			if (content === "Tutorial") {
				//do sth with Tutorials collection
				var editor = ace.edit("viewarchy");
				var file = editor.getValue();
				//upsert into Tutorials collection
				var path = Iron.Location.get().path;
				var split = path.split("/");
				var tagId = split[2];
				var id = Tutorials.findOne({"tagId" : tagId})._id;
				Tutorials.update({_id:id}, {$set:{
					file: file
				}});
			}else {
				//do sth with Questions collection
				var editor = ace.edit("viewarchy");
				var file = editor.getValue();
				var addedTags = Session.get("tagSession");
				var addedCompanies = Session.get("companySession");
				//upsert into Questions collection
				var obj = Questions.findOne({"questionName": content});
				var id = obj._id;
				var originTags = obj.taglist;
				//update taglist
				var i;
				for (i = 0; i < addedTags.length; i++) {
					originTags.push(addedTags[i]);
					//also create new tags if needed
					var query = Tags.findOne({"tagname" : addedTags[i]});
					if (query == null) {
						var tagId = Tags.insert({
							"tagname" : addedTags[i],
							"questionlist" : [id]
						});
						Tutorials.insert({
							tagname: addedTags[i],
							tagId: tagId,
							file: "//this is a tutorial"
						});
					} else {
						var query_id = query._id;
						var questionlist = query.questionlist;
						questionlist.push(id);
						Tags.update({_id:query_id}, {$set:{
							"questionlist": questionlist
						}});
					}
				}
				var originCompanies = obj.companylist;
				for (i = 0; i < addedCompanies.length; i++) {
					originCompanies.push(addedCompanies[i]);
					//create new company tag if needed
					var company_query = Companies.findOne({"companyname" : addedCompanies[i]});
					if (company_query == null) {
						Companies.insert({
							"companyname" : addedCompanies[i],
							"questionlist" : [id]
						});
					} else {
						var company_query_id = company_query._id;
						var questionlist = company_query.questionlist;
						questionlist.push(id);
						Companies.update({_id:company_query_id}, {$set:{
							"questionlist": questionlist
						}});
					}
				}
				Questions.update({_id:id}, {$set:{
					file: file,
					taglist: originTags,
					companylist: originCompanies
				}});
			}
		}
		Session.set("tagSession", []);
		Session.set("companySession", []);
		Session.set("ifEditMode", false);
		Materialize.toast('Change has been saved', 2000);
	}
});

Template.specview.rendered = function(){
	var editor;
	Tracker.autorun(function (e) {
		editor = AceEditor.instance("viewarchy",{
			theme:"dawn",
			mode:"java"
		});
		if(editor.loaded===true){
			e.stop();
			editor.insert("//please choose a question");
		}
	});
}
