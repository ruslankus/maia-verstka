/*
events
*/

$(document).ready(function(e) {

    $(document).on('click','.spec-block', function(){
        // $('#spec-content').slideUp();
        $('#spec-content').remove();
        $('.spec-block').removeClass('spec-active');
        $(this).addClass('spec-active');
        var objMap = $(this).data();
        var id = objMap.id;
        var order = objMap.order;
        var lastInRow;
        var row_nr;
        var itemsPerRow;
        if($(this).nextAll('.spec-block').length==0 || $( window ).width() < 440) // if click last element
        {
 
            next_div = $(this);
        } 
        else
        {
            if($( window ).width() > 768)
            {  
                itemsPerRow = 3;
            } 
            if($( window ).width() > 440 && $( window ).width() < 768)
            {  
                itemsPerRow = 2;
            } 
            row_nr  = Math.ceil(order/itemsPerRow);
            lastInRow = row_nr*itemsPerRow;
            if(lastInRow == order){
                next_div = $(this);
            }
            else
            {
              next_div = $(this).nextAll('.spec-block[data-order="'+lastInRow+'"]');
            }

            
            
        }
        next_div.after( '<div id="spec-content" class="spec-content clearfix"></div>' );
        var htmlData = $('#spec-content-hidden').html();
        $('#spec-content').html(htmlData);
        return false;
    });//click on spec-block

});

/*
events end
*/

/*
functions
*/

