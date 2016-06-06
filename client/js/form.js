Session.setDefault("tagSession", []);
Session.setDefault("companySession", []);
Session.setDefault("relatedSession", []);
Session.setDefault("srcIDSession", "");

Template.postform.events({
	"click input[name=group1]": function(event, template){
		var srcId = template.find(event.target).id;
		Session.set("srcIDSession", srcId);
	}
});


Template.related.helpers({
	settings: function() {
	    return {
	      position: "top",
	      limit: 5,
	      rules: [
	        {
	          collection: Tags,
	          field: "tagname",
	          template: Template.relatedlist
	        }
	      ]
	    };
  	},
	relatedList: function(){
		return Session.get("relatedSession");
	}
});

Template.related.events({
	"keypress #related": function(event, template){
		if (event.which == 13) {
			var relatedlist = Session.get("relatedSession");
			var question = template.find("#related").value.trim();
			relatedlist.push(question);
			Session.set("relatedSession", relatedlist);
			console.log(relatedlist);
		}
	},
	"click .material-icons": function(e, t) {
		var name = e.target.parentNode.childNodes[0].textContent;
		var relatedlist = Session.get("relatedSession");
		var i = relatedlist.indexOf(name);
		console.log(typeof name);
		if(i != -1) {
			relatedlist.splice(i, 1);
		}
		Session.set("relatedSession", relatedlist);
		console.log(relatedlist);
	}
});

Template.tags.helpers({
	settings: function() {
	    return {
	      position: "top",
	      limit: 5,
	      rules: [
	        {
	          collection: Tags,
	          field: "tagname",
	          template: Template.taglist
	        }
	      ]
	    };
  	},
	tagList: function(){
		return Session.get("tagSession");
	}
});


Template.companies.helpers({
	settings: function() {
	    return {
	      position: "top",
	      limit: 5,
	      rules: [
	        {
	          collection: Tags,
	          field: "tagname",
	          template: Template.companylist
	        }
	      ]
	    };
  	},
	companyList : function(){
		return Session.get("companySession");
	}
});

Template.companies.events({
	"keypress #companies": function(event, template){
		if (event.which == 13) {
			var companylist = Session.get("companySession");
			var company = template.find("#companies").value.trim();
			companylist.push(company);
			Session.set("companySession", companylist);
		}
	},
	"click .material-icons": function(e, t) {
		var name = e.target.parentNode.childNodes[0].textContent;
		var companylist = Session.get("companySession");
		var i = companylist.indexOf(name);
		if(i != -1) {
			companylist.splice(i, 1);
		}
		Session.set("companySession", companylist);
		console.log(companylist);
	}
});

Template.tags.events({
	"keypress #tags": function(event, template){
		if (event.which == 13) {
			var taglist = Session.get("tagSession");
			var tag = template.find("#tags").value.trim();
			console.log(tag);
			taglist.push(tag);
			console.log(taglist);
			Session.set("tagSession", taglist);
		}
	},
	"click .material-icons": function(e, t) {
		var name = e.target.parentNode.childNodes[0].textContent;
		var taglist = Session.get("tagSession");
		var i = taglist.indexOf(name);
		if(i != -1) {
			taglist.splice(i, 1);
		}
		Session.set("tagSession", taglist);
		console.log(taglist);
	}
});
