if (Meteor.isClient) {
    Template.post.rendered = function(){
        var editor;
       	Tracker.autorun(function (e) {
        	console.log("A");
       		editor = AceEditor.instance("archy",{
    			theme:"dawn",
    			mode:"java"
			});
       		if(editor.loaded===true){
         		e.stop();
         		editor.insert("//paste your question and solution here...");
		 	}
     	});
    }
}
