$(function(){
  $("#editableColor").click(function() {
    if ($('#newcolor').length == 0) {
      addInput($(this));
    }
  });

  $('body').keyup(function(event){
    if (event.which == 27) {
      removeInput();
    }
  });
});

function addInput(element){
  var input = '<input id="newcolor" placeholder="New color"/>';
  element.append(input);
  $('#instructions').text('Press Enter to save, Esc to quit');

  $('#newcolor').keypress(function(event){
    if (event.which == 13){
      var color = $(this).val();
      var name = $('#name').text();
      var data = { "color":color, "name":name };

      $.ajax({method:"PUT", data:data, url:'/updateColor'})
      .done(function(result){
        $('#editableColor').text(result.color);
        removeInput();
      })
      .fail(function(err){
        console.log(err);
        removeInput();
      })
    }
  });
}

function removeInput(){
  $('#instructions').text(' (click color to edit)');
  $('#newcolor').remove();
}
