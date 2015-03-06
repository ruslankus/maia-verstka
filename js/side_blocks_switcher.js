jQuery(document).ready(function(){

    jQuery(".pull-left").find('a').click(function(){
        jQuery('.s-cont').removeClass('side-container-b').removeAttr('style');
        jQuery('.a-left').addClass('side-container-a s-cont').animate({'left':0});
    });

    jQuery(".pull-right").find('a').click(function(){
        jQuery('.s-cont').removeClass('side-container-a').removeAttr('style');
        jQuery('.a-right').addClass('side-container-b s-cont').animate({'right':0});
    });

    jQuery(window).resize(function(){
        jQuery(".s-cont").removeClass('side-container-a').removeClass('side-container-b').removeClass('s-cont').removeAttr('style');
    });

    /*
    $(document).click(function(event) {
        if(!$(event.target).closest('.s-cont').length) {
            $('.s-cont').remove();
        }
    })
    */

});