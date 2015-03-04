/**
 * Created by AsusAlex on 2/27/15.
 */

var MaiaDatePicker = {
    //constant data
    months : ['January','February','March','April','May','June','July','August','September','October','November','December'],
    daysNormal : ['31','28','31','30','31','30','31','31','30','31','30','31'],
    daysLeap : ['31','29','31','30','31','30','31','31','30','31','30','31'],

    //changing data
    calendarData: [],
    selectedDate: {y:0,m:0,d:0},
    currentMonth: 0,

    /**
     * Callback function, to catch selection event
     * @param y
     * @param m
     * @param d
     */
    onSelect: function(y,m,d){},

    /**
     * Returns object with date-info
     * @returns {{y: number, m: number, d: number}}
     */
    getCurrentDate : function(){
        var now = new Date;
        var year = now.getFullYear();
        var month = now.getMonth();
        var day = now.getDate();

        return {
            y: year,
            m: month,
            d: day
        }
    },

    /**
     * Rebuild info by date
     * @param y
     * @param m
     */
    rebuild : function(y,m){
        //today
        var today = this.getCurrentDate();

        //store current month
        this.currentMonth = m;

        //init array with empty days
        for(i = 0; i < 70; i++)
        {
            this.calendarData[i] = {
                day:0,
                empty:true,
                selected:false,
                today:false
            };
        }

        //quantity of days in month
        var days =((y%4)==0)?this.daysLeap[m]:this.daysNormal[m];

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
            var _selected = ((i+1) == this.selectedDate.d && m == this.selectedDate.m);
            var _today = (i+1) == today.d && m == today.m;

            if((i+1) <= days)
            {
                this.calendarData[i+offset] = {
                    day:i+1,
                    empty:false,
                    selected:_selected,
                    today:_today
                };
            }
            else
            {
                this.calendarData[i+offset] = {
                    day:0,
                    empty:true,
                    selected:false,
                    today:false
                };
            }
        }
    },

    /**
     * Visually update calendar
     */
    update: function(){

        var calendarElem = jQuery("#calendar");
        var switcher = calendarElem.find(".switcher");

        switcher.find("#current").html(this.months[this.currentMonth]);

        if(typeof this.months[this.currentMonth-1] !== 'undefined')
        {
            switcher.find("#back").html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+this.months[this.currentMonth-1]);
        }
        else
        {
            switcher.find("#back").html('');
        }

        if(typeof this.months[this.currentMonth+1] !== 'undefined')
        {
            switcher.find("#next").html(this.months[this.currentMonth+1]+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
        }
        else
        {
            switcher.find("#next").html('');
        }

        calendarElem.find(".day").remove();

        for(i = 0; i < 35; i++)
        {
            if(this.calendarData[i].empty == true)
            {
                calendarElem.append('<div class="day empty"></div>');
            }
            else
            {
                if(this.calendarData[i].today == true || this.calendarData[i].selected == true)
                {
                    if(this.calendarData[i].today == true)
                    {
                        calendarElem.append('<div class="day today">'+this.calendarData[i].day+'</div>');
                    }
                    if(this.calendarData[i].selected == true)
                    {
                        calendarElem.append('<div class="day selected">'+this.calendarData[i].day+'</div>');
                    }
                }
                else if(this.calendarData[i].today != true && this.calendarData[i].selected != true)
                {
                    calendarElem.append('<div class="day">'+this.calendarData[i].day+'</div>');
                }
            }
        }

        this.registerDayClicks();
    },

    /**
     * Register click events for day-cells
     */
    registerDayClicks: function(){

        var date = this.getCurrentDate();
        var _this = this;

        jQuery("#calendar").find(".day").on('click',function(){

            if(!jQuery(this).hasClass('empty'))
            {

                jQuery("#calendar").find(".day").removeClass('selected');
                jQuery(this).addClass('selected');

                var valDay = jQuery(this).html();
                _this.selectedDate.y = date.y;
                _this.selectedDate.m = _this.currentMonth;
                _this.selectedDate.d = valDay;

                _this.onSelect(_this.selectedDate.y, _this.selectedDate.m, _this.selectedDate.d);
            }
        });
    },

    /**
     * Register click events for months
     */
    registerMonthClicks: function()
    {
        var calendar = jQuery("#calendar");
        var date = this.getCurrentDate();
        var _this = this;

        calendar.find(".switcher").find("#back").click(function(){
            if(_this.currentMonth-1 >= 0)
            {
                _this.rebuild(date.y,_this.currentMonth-1);
                _this.update();
            }

        });

        calendar.find(".switcher").find("#next").click(function(){
            if(_this.currentMonth+1 <= 11)
            {
                _this.rebuild(date.y,_this.currentMonth+1);
                _this.update();
            }
        });
    }
};