Session.setDefault("whichFilter", "Tags");

Template.sortby.events({
	"click .collection-item": function(event, template){
		//remove active first
		var previousSelected = document.getElementById("act");
		previousSelected.removeAttribute("id");
		//add to new selected
		var selectedNode = event.target;
		selectedNode.setAttribute("id", "act");
		var name = selectedNode.textContent;
		Session.set("whichFilter", name);
	}
});


Template.categorylist.helpers({
	"dynamictemplate": function(){
		var name = Session.get("whichFilter")+"DynamicTemplate";
		return name;
	}
});
