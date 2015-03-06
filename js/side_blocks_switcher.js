jQuery(document).ready(function(){

    var w = jQuery(window).width() - 30;


    jQuery(".pull-left").find('a').click(function(){

        if(!jQuery(this).hasClass('active-button'))
        {
            jQuery(this).addClass('active-button');
            jQuery(".pull-right").find('a').removeClass('active-button');
            jQuery('.s-cont').removeClass('side-container-b').removeAttr('style');
            jQuery('.a-left').css({'left':-w+'px','width':w+'px'}).addClass('side-container-a s-cont').animate({'left':15+'px'});
        }
        else
        {
            jQuery(this).removeClass('active-button');
            jQuery('.a-left').animate({'left':-w+'px'},100);
        }
    });

    jQuery(".pull-right").find('a').click(function(){

        if(!jQuery(this).hasClass('active-button'))
        {
            jQuery(this).addClass('active-button');
            jQuery(".pull-left").find('a').removeClass('active-button');
            jQuery('.s-cont').removeClass('side-container-a').removeAttr('style');
            jQuery('.a-right').css({'right':-w+'px','width':w+'px'}).addClass('side-container-b s-cont').animate({'right':15+'px'});
        }
        else
        {
            jQuery(this).removeClass('active-button');
            jQuery('.a-right').animate({'right':-w+'px'});
        }
    });

    jQuery(window).resize(function(){
        w = jQuery(window).width() - 30;
        jQuery('.a-left').removeAttr('style');
        jQuery('.a-right').removeAttr('style');
        jQuery(".s-cont").removeClass('side-container-a').removeClass('side-container-b').removeClass('s-cont');

        jQuery(".pull-left").find('a').removeClass('active-button');
        jQuery(".pull-right").find('a').removeClass('active-button');
    });


    /*
    $(document).click(function(event) {
        if(!$(event.target).closest('.s-cont').length) {
            $('.s-cont').remove();
        }
    })
    */

});