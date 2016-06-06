Session.setDefault("tagSession", []);
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
	}
});
