/*
$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();
  });
*/

Template.navbar.events({
	"click .modal-trigger": function(event, template){
		$('#modal1').openModal();
	}
});
