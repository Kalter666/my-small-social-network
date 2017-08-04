$("#message-holder").scrollTop($("#message-holder").prop("scrollHeight"));
$("#newmessage").keyup(function(event){
    if(event.keyCode == 13){
        $("#submit-message").click();
    }
});