/**
 * Created by AsusAlex on 2/27/15.
 */

var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var daysNormal = ['31','28','31','30','31','30','31','31','30','31','30','31'];
var daysLeap = ['31','29','31','30','31','30','31','31','30','31','30','31'];

var calendarData = [];
var selectedDate = {y:0,m:0,d:0};
var currentMonth = 0;

/**
 * Returns current date
 * @returns {{y: number, m: number, d: number}}
 */
var currentDate = function()
{
    var now = new Date;
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();

    return {
        y: year,
        m: month,
        d: day
    }
};


/**
 * Builds calendar by specified date
 * @param y
 * @param m
 */
var buildCalendarDaysByDate = function(y,m)
{
    //today
    var today = currentDate();

    //store current month
    currentMonth = m;

    //init array with empty days
    for(i = 0; i < 70; i++)
    {
        calendarData[i] = {
            day:0,
            empty:true,
            selected:false,
            today:false
        };
    }

    //quantity of days in month
    var days =((y%4)==0)?daysLeap[m]:daysNormal[m];

    //offset of days
    var offset = 0;
    var ds = new Date(y,m,8);
    var weekStart = ds.getDay();

    if(weekStart == 0)
    {
        offset = 7-1;
    }
    else
    {
        offset = weekStart-1
    }

    //build array
    for(i = 0; i < 35; i++)
    {
        var _selected = ((i+1) == selectedDate.d && m == selectedDate.m);
        var _today = (i+1) == today.d && m == today.m;

        if((i+1) <= days)
        {
            calendarData[i+offset] = {
                day:i+1,
                empty:false,
                selected:_selected,
                today:_today
            };
        }
        else
        {
            calendarData[i+offset] = {
                day:0,
                empty:true,
                selected:false,
                today:false
            };
        }
    }
};

/**
 * Updates visual
 */
var updateVisuals = function()
{
    var calendarElem = jQuery("#calendar");
    var switcher = calendarElem.find(".switcher");

    switcher.find("#current").html(months[currentMonth]);

    if(typeof months[currentMonth-1] !== 'undefined')
    {
        switcher.find("#back").html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+months[currentMonth-1]);
    }
    else
    {
        switcher.find("#back").html('');
    }

    if(typeof months[currentMonth+1] !== 'undefined')
    {
        switcher.find("#next").html(months[currentMonth+1]+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    }
    else
    {
        switcher.find("#next").html('');
    }

    calendarElem.find(".day").remove();

    for(i = 0; i < 35; i++)
    {
        if(calendarData[i].empty == true)
        {
            calendarElem.append('<div class="day empty"></div>');
        }
        else
        {
            if(calendarData[i].today == true || calendarData[i].selected == true)
            {
                if(calendarData[i].today == true)
                {
                    calendarElem.append('<div class="day today">'+calendarData[i].day+'</div>');
                }
                if(calendarData[i].selected == true)
                {
                    calendarElem.append('<div class="day selected">'+calendarData[i].day+'</div>');
                }
            }
            else if(calendarData[i].today != true && calendarData[i].selected != true)
            {
                calendarElem.append('<div class="day">'+calendarData[i].day+'</div>');
            }
        }
    }

    registerClicks();
};

var registerClicks = function()
{
    var date = currentDate();

    jQuery(document).find(".day").on('click',function(){
        if(!jQuery(this).hasClass('empty'))
        {

            jQuery(".day").removeClass('selected');
            jQuery(this).addClass('selected');

            var valDay = jQuery(this).html();
            selectedDate.y = date.y;
            selectedDate.m = currentMonth;
            selectedDate.d = valDay;

            alert(selectedDate.y + ', ' + selectedDate.m + ',  ' + selectedDate.d);
        }
    });
};

jQuery(document).ready(function(){

    var date = currentDate();
    buildCalendarDaysByDate(date.y,date.m);
    updateVisuals();


    jQuery("#calendar").find(".switcher").find("#back").click(function(){
        if(currentMonth-1 >= 0)
        {
            buildCalendarDaysByDate(date.y,currentMonth-1);
            updateVisuals();
        }

    });

    jQuery("#calendar").find(".switcher").find("#next").click(function(){
        if(currentMonth+1 >= 11)
        {
            buildCalendarDaysByDate(date.y,currentMonth+1);
            updateVisuals();
        }
    });

});

