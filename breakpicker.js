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
        return this.currentDateMoment.get('month');
    },
    currentYear: function() {
        // return this.currentDate.getYear()
        return this.currentDateMoment.get('year');
    },

    set: function(id) {
        var element = document.getElementById(id);
        if (!element) return;

        var _this = this;

        debugger
        element.onclick = function(e) {
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

        this.showMonth();
    },

    showMonth: function() {

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
