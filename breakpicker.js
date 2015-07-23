var Moment = require('moment');

Breakpicker = {
    currentDate: new Date(),
    currentDateMoment: Moment(),
    setting: {},
    lang: {
        en: {
            months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            days: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        }
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],

    currentMonth: function() {
        //return this.currentDate.getMonth();
        return this.currentDateMoment.get('month').toString();
    },
    currentYear: function() {
        // return this.currentDate.getYear()
        return this.currentDateMoment.get('year').toString();
    },

    set: function(id) {
        var element = document.getElementById(id);
        if (!element) return;

        var _this = this;

        element.onfocus = function(e) {
            e.preventDefault();
            _this.setting.element_id = id;
            _this.show();
        }
    },

    show: function() {
        if (this.setting.showed) return;

        this.setting.showed = true;
        this.buildCal();

    },

    buildCal: function() {
        var element = document.getElementById(this.setting.element_id)
            style = {
                w: element.offsetWidth,
                h: element.offsetHeight
            },
            xy = this.getPosition(element),
            breakpickerContainer = document.createElement('div'),
            breakpicker = document.createElement('div');

        breakpickerContainer.className = 'breakpicker-container';
        breakpickerContainer.style.width = style.w + 'px';
        breakpickerContainer.style.height = style.h + 'px';

        document.getElementsByTagName('body')[0].insertBefore(breakpickerContainer, document.getElementsByTagName('body')[0].firstChild);

        breakpicker.className = 'breakpicker';
        breakpicker.style.left = style.w + 'px';
        breakpicker.style.top = style.h + 'px';

        breakpickerContainer.appendChild(breakpicker);

        this.wrapElement(breakpickerContainer, element);

        breakpicker.innerHTML = this.showMonth();

        this.addPickerDate();

    },

    addPickerDate: function() {
        var testElm = document.querySelectorAll('.active-picker');

        for (var i = 0; i < testElm.length; i++) {

            testElm[i].onclick = function(e) {
                e.preventDefault();
            }
        }

    },

    showMonth: function() {
        var year = this.currentYear(),
            month = this.currentMonth(),
            firstDayOfmonth = Moment(year, month).startOf('month').day(),
            lastDayOfMonth = Moment(year, month).endOf('month').date(),
            lastDayOfPreviousMonth = Moment(year, month).subtract(1, 'month').endOf('month').date();

        var html = '<table>';

        // create selected month and year
        html += '<tr><td colspan="7">' + this.lang.en.months[month] + ' - ' + year + '</td></tr>';

        // create header of the week
        html += '<tr>';

        for (var i = 0; i < this.lang.en.days.length; i++) {
            html += '<td>' + this.lang.en.days[i] + '</td>';
        }

        html += '</tr>';

        // create the days
        var i = 1;


        do {

            var dayLeft = new Date(year, month, i).getDay(); //

            // If Sunday, start new row
            if ( dayLeft == 0 ) {
                html += '<tr>';
            }
            
            // If not Sunday but first day of the month
            // it will write the last days from the previous month
            else if ( i == 1 ) {
                html += '<tr>';
                var k = lastDayOfPreviousMonth - firstDayOfmonth + 1;

                for(var j=0; j < firstDayOfmonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

            var dataDateObject = this.setMonthOptions(i);

            // Write the current day in the loop
            html += '<td class="active-picker"><a data-date-' + '="{date:'+ dataDateObject.date + ', month:'+ 
                    dataDateObject.month + ', year:'+ dataDateObject.year + '}" data-date-id="'+ i +'">' 
                    + i + '</a></td>';

            // If Saturday, closes the row
            if ( dayLeft == 6 ) {
                html += '</tr>';
            } else if ( i == lastDayOfMonth ) { // If not Saturday, but last day of the selected month it will write the next few days from the next month
                var k = 1;

                for(dayLeft; dayLeft < 6; dayLeft++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

            i++;

        } while (i <= lastDayOfMonth);

        html += '</table>';

        return html;
    },

    setMonthOptions: function(day) {
        var dateOptions = {
            date: Moment().date(day).get('date'),
            month: Moment().date(day).get('month'),
            year: Moment().date(day).get('year')
        };

        // debugger
        return dateOptions;
    },

    wrapElement: function(container, elms) {
        if (!elms.length) elms = [elms];

        for (var i = elms.length - 1; i >= 0; i--) {
            var child = (i > 0) ? container.cloneNode(true) : container;
            var el = elms[i];

            var parent = el.parentNode;
            var sibling = el.nextSibling;

            child.appendChild(el);

            if (sibling) {
                parent.insertBefore(child, sibling);
            } else {
                parent.appendChild(child);
            }
        }
    },

    getPosition: function(elm) {
        var x = 0,
            y = 0,
            xy = {};

        while (elm) {
            x += elm.offsetLeft;
            y += elm.offsetTop;
            elm = elm.offsetParent;
        }

        if (navigator.userAgent.indexOf("Mac") != -1 && typeof document.body.leftMargin != "undefined") {
            x += document.body.leftMargin;
            offsetTop += document.body.topMargin;
        }

        xy['x'] = x;
        xy['y'] = y;

        return xy;
    }
};

module.exports = Breakpicker
