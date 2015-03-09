jQuery(document).ready(function(){

    var w = jQuery(window).width() - 30;

    jQuery(".pull-left").find('a').click(function(){

        if(!jQuery(this).hasClass('active-button'))
        {
            jQuery(this).addClass('active-button');
            jQuery(".pull-right").find('a').removeClass('active-button');
            jQuery('.s-cont').removeClass('side-container-b').removeAttr('style');
            jQuery('.a-left').append('<div class="cross-close"></div>').css({'left':-w+'px','width':w+'px'}).addClass('side-container-a s-cont').animate({'left':15+'px'});
        }
        else
        {
            jQuery(this).removeClass('active-button');
            jQuery('.a-left').animate({'left':-w+'px'});
        }

        jQuery(".cross-close").click(function(){
            closeAll();
        });

    });

    jQuery(".pull-right").find('a').click(function(){

        if(!jQuery(this).hasClass('active-button'))
        {
            jQuery(this).addClass('active-button');
            jQuery(".pull-left").find('a').removeClass('active-button');
            jQuery('.s-cont').removeClass('side-container-a').removeAttr('style');
            jQuery('.a-right').append('<div class="cross-close"></div>').css({'left':-w+'px','width':w+'px'}).addClass('side-container-b s-cont').animate({'left':15+'px'});
        }
        else
        {
            jQuery(this).removeClass('active-button');
            jQuery('.a-right').animate({'left':-w+'px'});
        }

        jQuery(".cross-close").click(function(){
            closeAll();
        });
    });

    jQuery(window).resize(function(){
        w = jQuery(window).width() - 30;
        closeAll();
    });

    function closeAll()
    {
        jQuery('.a-left').removeAttr('style');
        jQuery('.a-right').removeAttr('style');
        jQuery(".s-cont").removeClass('side-container-a').removeClass('side-container-b').removeClass('s-cont');

        jQuery(".pull-left").find('a').removeClass('active-button');
        jQuery(".pull-right").find('a').removeClass('active-button');
        jQuery(".cross-close").remove();
    }


    /*
    $(document).click(function(event) {
        if(!$(event.target).closest('.s-cont').length) {
            $('.s-cont').remove();
        }
    })
    */

});