var array = ["Today", "Last Three Days" ,"Last Week", "Last Two Weeks", "Last Month"];
Session.setDefault("qidSelected", null);

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
				return [];
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
