var array = ["Today", "Last Three Days", "Last Week", "Last Two Weeks", "Last Month"];
Template.TagsDynamicTemplate.helpers({
	"tags" : function() {
		return Tags.find();
	},
	"tagname" : function() {
		return this.tagname;
	}
	,
	"count" : function(){
		return Tags.findOne({"tagname" : this.tagname}).questionlist.length;
	}
});

Template.CompaniesDynamicTemplate.helpers({
	"tags" : function() {
		return Companies.find();
	},
	"tagname" : function() {
		return this.companyname;
	}
	,
	"count" : function(){
		return Companies.findOne({"companyname" : this.companyname}).questionlist.length;
	}
});

Template.SourcesDynamicTemplate.helpers({
	"tags" : function() {
		return SourceIDs.find();
	},
	"tagname" : function() {
		return this.srcID;
	}
	,
	"count" : function(){
		return SourceIDs.findOne({"srcID" : this.srcID}).questionlist.length;
	}
});

Template.DatesDynamicTemplate.helpers({
	"tags" : function() {
		return array;
	},
	"index" : function(){
		var name = this.toString();
		return array.indexOf(name);
	}
});

Template.TagsDynamicTemplate.events({
	"click .collection-item": function(event, template){
		console.log(Session.get("whichFilter"));
	}
});
