jQuery(document).ready(function(){

    jQuery(".pull-left").find('a').click(function(){

        jQuery(".s-cont").remove();
        var html = jQuery('.a-left').html();
        jQuery(document.body).append('<aside class="a-left side-container-a s-cont">'+html+'</aside>');
        jQuery(".side-container-a").animate({'left':0});
    });

    jQuery(".pull-right").find('a').click(function(){

        jQuery(".s-cont").remove();
        var html = jQuery('.a-right').html();
        jQuery(document.body).append('<aside class="a-right side-container-b s-cont">'+html+'</aside>');
        jQuery(".side-container-b").animate({'right':0});
    });

    jQuery(window).resize(function(){
        jQuery(".s-cont").remove();
    });

    /*
    $(document).click(function(event) {
        if(!$(event.target).closest('.s-cont').length) {
            $('.s-cont').remove();
        }
    })
    */

});