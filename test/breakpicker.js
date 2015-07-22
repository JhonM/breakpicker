var assert = require('chai'),
    expect = assert.expect,
    breakpicker = require('../breakpicker');

describe('#breakpicker', function(){
    it('verifies days of the week are equal', function() {
        var weekDays = breakpicker,
            days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

         expect(weekDays.days_of_the_week).to.eql(days)
    });
});