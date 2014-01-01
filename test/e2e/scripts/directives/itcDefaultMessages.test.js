'use strict';

describe("itcDefaultMessages directive", function ()
{
    beforeEach(function ()
    {
        browser().navigateTo("/");
    });

    describe("when input is pristine and without focus", function ()
    {
        it("should be no messages", function ()
        {
            expect(element('#email.ng-pristine').count()).toBe(1);
            expect(element('.popover').count()).toBe(0);
        });
    });

    describe("when input has focus", function ()
    {
        it("should display popover with message", function ()
        {
            element('#email').query(function(elements, done) {
                elements.focus();
                done();
            });
            expect(element('.popover').count()).toBe(1);
        });
    });

    describe("when input has lost focus", function ()
    {
        it("should hide popover", function ()
        {
            /*Click on the area near the input*/
            element(".panel").click();
            expect(element('.popover').count()).toBe(0);
        });
    });
});