//mobile width-bound
var mobileBound = 573;
var wMobileBound = 480;

//prepared array of cities
var tags = [
    {'label':'Vilnius','id':1},
    {'label':'Kaunas','id':2},
    {'label':'Klaipeda','id':3},
    {'label':'Nemencine','id':4},
    {'label':'Panevezys','id':5},
    {'label':'Utena','id':6}
];


//when loaded (chrome fix)
jQuery(window).load(function(){
    reCalcActiveWidth();
});

//when the document ready
jQuery(document).ready(function(){


    /**
     * Date-picker stuff
     */
    var picker = MaiaDatePicker;
    var date = picker.getCurrentDate();
    picker.rebuild(date.y,date.m);
    picker.update();
    picker.registerMonthClicks();

    reCalcActiveWidth();

    jQuery(window).resize(function(){
        reCalcActiveWidth();
        jQuery(".calendar").css({'display':'none'});
        jQuery(".services-selection-box").css({'display':'none'});
        jQuery(".time-selection-box").css({'display':'none'});
    });

    /**
     * When clicked on search block
     */
    jQuery(".in-search").click(function(){

        //reset date-picker
        picker.selectedDate = {y:0,m:0,d:0};
        picker.rebuild(date.y,date.m);
        picker.update();


        //empty time field
        jQuery("#time_input").val("");

        //empty date-filed
        jQuery("#date_input").val("");

        //empty search-field
        jQuery("#city_id_input").val("");

        //empty service-filed
        jQuery("#services_id_input").val("");

        //reset time selector
        jQuery(".time-selection-box li").removeClass("active");

        //empty search field
        jQuery(this).val('');

        //can search
        changePhase('search');
    });

    /**
     * Auto-Complete
     */
    jQuery(".in-search.elem").autocomplete({
        source: tags,

        /**
         * When selected city
         * @param a
         * @param b
         */
        select: function(a,b)
        {
            //get label and id
            var label = b.item.value;
            var id = b.item.id;

            //remove focus from input
            jQuery(".in-search").blur();

            //store city id to hidden field
            jQuery("#city_id_input").val(id);

            //switch to service editing
            changePhase('services');
        }

    });

    /**
     * When clicked on service block
     */
    jQuery(".in-services").click(function(){

        //if active or completed
        if(jQuery(this).hasClass('active') || jQuery(this).hasClass('completed'))
        {
            //reset date-picker
            picker.selectedDate = {y:0,m:0,d:0};
            picker.rebuild(date.y,date.m);
            picker.update();

            //empty date-filed
            jQuery("#date_input").val("");

            //empty time field
            jQuery("#time_input").val("");

            //reset time selector
            jQuery(".time-selection-box li").removeClass("active");

            //can edit services (switch to service editing phase)
            changePhase('services');
        }
    });

    /**
     * On selecting services / clicking continue
     */
    jQuery(".services-selection-box li").click(function(){

        //if this is not 'next' button
        if(!jQuery(this).hasClass('next'))
        {
            //mark selected/unselected
            if(jQuery(this).hasClass('active'))
            {
                jQuery(this).removeClass('active');
            }
            else
            {
                jQuery(this).addClass('active');
            }
        }

        //if this is next button
        else
        {
            //TODO: write array of selected items to hidden field

            //change phase to date editing
            changePhase('date');
        }
    });

    /**
     * Click on date-block
     */
    jQuery(".in-date").click(function(){

        //if active or completed
        if(jQuery(this).hasClass('active') || jQuery(this).hasClass('completed'))
        {
            //empty time field
            jQuery("#time_input").val("");

            //reset time selector
            jQuery(".time-selection-box li").removeClass("active");

            //can edit date(switch to date editing phase)
            changePhase('date');
        }
    });

    /**
     * When selected day in calendar
     * @param y
     * @param m
     * @param d
     */
    picker.onSelect = function(y,m,d)
    {
        //store selected date in hidden field
        var str = y + '/' + 'm' + '/' + d;
        jQuery("#date_input").val(str);

        //switch to time selection
        changePhase('time');
    };

    /**
     * When clicked on time block
     */
    jQuery(".in-time").click(function(){
        //if active or completed
        if(jQuery(this).hasClass('active') || jQuery(this).hasClass('completed'))
        {
            //can edit time
            changePhase('time');
        }
    });

    /**
     * When selected time
     */
    jQuery(".time-selection-box li").click(function(){
        jQuery(".time-selection-box li").removeClass("active");
        jQuery(this).addClass('active');
        jQuery("#time_input").val(jQuery(this).html());

        changePhase('finish');
    });

});


/**
 * Calculates the widths of active blocks
 */
function reCalcActiveWidth()
{
    var line = jQuery(".s-line");
    var not_mobile = line.width() > mobileBound;

    if(not_mobile)
    {
        if(!line.hasClass('not-mobile'))
        {
            line.addClass('not-mobile');
        }
    }
    else
    {
        if(line.hasClass('not-mobile'))
        {
            line.removeClass('not-mobile');
        }
    }

    if(!line.hasClass('untouched'))
    {
        if(!not_mobile)
        {
            jQuery(".in-search.elem").removeAttr('style');
            jQuery(".elem.h").removeAttr('style');

            var active_w = line.width() - ((41 * 3) + 40)-1;
            jQuery(".elem.active").css({width:active_w+"px"});
        }
        else
        {
            var elem_all_w = ((line.width() / 4)-11)-1;
            jQuery(".in-search.elem").css({width:elem_all_w+1+"px"});
            jQuery(".elem.h").css({width:elem_all_w+"px"});
        }
    }
    else
    {
        var search_w = line.width() - 40-1;
        jQuery(".elem.in-search").css({width:search_w+"px"});
    }
}

/**
 * Service block positions
 */
function calcServiceBlockPositions()
{
    var srv_line = jQuery(".in-services");
    var services_block = jQuery(".services-selection-box");
    var line = jQuery(".s-line");

    var x = 0;
    var y = jQuery(".header").height() > 64 ? 76 : 12;

    if(jQuery(window).width() < wMobileBound)
    {
        x = line.offset().left;
        //y = line.offset().top;
    }
    else
    {
        x = srv_line.offset().left;
        //y = srv_line.offset().top;
    }

    services_block.css({'left':x+'px','top':y+40+'px'});
}

/**
 * Calendar block positions
 */
function calcCalendarBlockPositions()
{
    var date_line = jQuery(".in-date");
    var calendar_block = jQuery(".calendar");
    var line = jQuery(".s-line");

    var x = 0;
    var y = jQuery(".header").height() > 64 ? 76 : 12;

    if(jQuery(window).width() < wMobileBound)
    {
        x = line.offset().left;
        //y = line.offset().top;
    }
    else
    {
        x = date_line.offset().left;
        //y = date_line.offset().top;
    }

    calendar_block.css({'left':x+'px','top':y+40+'px'});
}

/**
 * Time selection-block positions
 */
function calcTimeBlockPositions()
{
    var srv_line = jQuery(".in-time");
    var time_block = jQuery(".time-selection-box");
    var line = jQuery(".s-line");

    var x = 0;
    var y = jQuery(".header").height() > 64 ? 76 : 12;


    if(jQuery(window).width() < wMobileBound)
    {
        x = line.offset().left;
        //y = line.offset().top;
    }
    else
    {
        x = srv_line.offset().left;
        //y = srv_line.offset().top;
    }

    time_block.css({'left':x+'px','top':y+40+'px'});
}

/**
 * Switches the search-bar to specified phase
 * @param phase
 */
function changePhase(phase)
{
    var all = jQuery(".elem");
    var line = jQuery(".s-line");
    var search = jQuery(".in-search");
    var services = jQuery(".in-services");
    var date = jQuery(".in-date");
    var time = jQuery(".in-time");

    var services_block = jQuery(".services-selection-box");
    var calendar_block = jQuery(".calendar");
    var time_block = jQuery(".time-selection-box");

    line.removeClass('untouched');
    services_block.css({'display':'none'});
    calendar_block.css({'display':'none'});
    time_block.css({'display':'none'});
    line.removeClass('finished');

    switch (phase)
    {
        case 'search':
            jQuery(".services-selection-box li").removeClass('active');
            all.removeClass('active').removeClass('completed');
            search.addClass('active');
            break;

        case 'services':
            services_block.css({'display':'block'});
            all.removeClass('active');
            date.removeClass('completed');
            time.removeClass('completed');
            search.addClass('completed').removeAttr('style');
            services.addClass('active');
            break;

        case 'date':
            calendar_block.css({'display':'block'});
            all.removeClass('active');
            time.removeClass('completed');
            services.addClass('completed').removeAttr('style');
            date.addClass('active');
            break;

        case 'time':
            time_block.css({'display':'block'});
            all.removeClass('active');
            date.addClass('completed').removeAttr('style');
            time.addClass('active');
            break;

        case 'finish':
            all.removeClass('active');
            all.addClass('completed');
            line.addClass('finished');
            //all.removeClass('completed').removeAttr('style');
            //line.addClass('untouched');
            break;

        case 'clear':
            all.removeClass('active').removeClass('completed').removeAttr('style');
            line.addClass('untouched').removeClass('finished');
            break;
    }

    reCalcActiveWidth();
    calcServiceBlockPositions();
    calcCalendarBlockPositions();
    calcTimeBlockPositions();
}