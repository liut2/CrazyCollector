Session.setDefault("tagSession", []);
Session.setDefault("companySession", []);
Session.setDefault("srcIDSession", "");

Template.postform.events({
	"click input[name=group1]": function(event, template){
		var srcId = template.find(event.target).id;
		Session.set("srcIDSession", srcId);
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
	          collection: Companies,
	          field: "companyname",
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
			template.find("#companies").value = "";
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
			template.find("#tags").value = "";
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
