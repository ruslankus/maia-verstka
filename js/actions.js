/*
events
*/

$(document).ready(function(e) {

    $(document).on('click','.info a', function(){
        var objMap = $(this).data();
        var id = objMap.id;
     	renderInfo(id);
        removeActive(id);
        $('#item-'+id+' .info a').addClass("active");
        $('#item-'+id+' .load-content').show();
    		return false;
	});//click on info button

    $(document).on('click','.map a', function(){
        var objMap = $(this).data();
        var id = objMap.id;
     	renderMap(id);
        removeActive(id);
        $('#item-'+id+' .map a').addClass("active");
        $('#item-'+id+' .load-content').show();
    	return false;
	});//click on map button

    $(document).on('click','.cart a', function(){
        var objMap = $(this).data();
        var id = objMap.id;
     	renderCart(id);
        removeActive(id);
        $('#item-'+id+' .cart a').addClass("active");
        $('#item-'+id+' .load-content').show();
    	return false;
	});//click on cart button

    $(document).on('click','.book a', function(){
        var objMap = $(this).data();
        var id = objMap.id;
     	renderBook(id);
        removeActive(id);
        $('#item-'+id+' .book a').addClass("active");
        $('#item-'+id+' .load-content').show();
    		return false;
	});//click on book button

    $(document).on('click','.hide-block', function(){
        var objMap = $(this).data();
        var id = objMap.id;
        $( "#item-"+id+" .load-content" ).slideUp('normal',function() {
            $( "#item-"+id+" .load-content" ).html('');
            removeActive(id);
    });
      //$( ".load-content" ).html('');
    return false;
  });//click on hide block button

});

/*
events end
*/

/*
functions
*/

function removeActive(id){
  $('#item-'+id+' .item-menu li a').removeClass('active');
}
function renderInfo(id)
{
    var url = '/ajax/Info/'+id;
    $('#item-'+id+' .load-content' ).load(url);
}

function renderMap(id)
{
    var link = '/ajax/Map/'+id;
    /*
    $(".load-content").load(url,);
   initialize();
   */
     $.ajax({type: "post",url:link}).done(function(data){
       
            obj = jQuery.parseJSON(data);
            //console.log(obj);
            $("#item-"+id+" .load-content").html(obj.html);
            var address = obj.address;
            initialize(address,id); 
        
     });
}


function renderCart(id)
{
    var url = '/ajax/Cart/'+id;
    $('#item-'+id+' .load-content' ).load(url);
}

function renderBook(id)
{
    var url = '/ajax/Book/'+id;
    $('#item-'+id+' .load-content' ).load(url);
}