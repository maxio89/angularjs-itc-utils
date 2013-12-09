'use strict';

describe("itcValidationMessages directive", function ()
{
    beforeEach(function ()
    {
        browser().navigateTo("/");
    });

    var correctEmail = 'example@foo.com';

    describe("when input is pristine and without focus", function ()
    {
        it("should be no messages", function ()
        {
            expect(element('#email.ng-pristine').count()).toBe(1);
//            expect($('#email').focus()).toBeFocused();
            expect(element('.popover.error').count()).toBe(0);
        });
    });
    describe("when input has email type", function ()
    {
        describe("and email is wrong", function ()
        {
            it("should display popover with message", function ()
            {
                input("credentials.email").enter("foo");
                expect(element('.popover.error').count()).toBe(1);
            });

            describe("and email is correct after being wrong", function ()
            {
                it("should hide popover", function ()
                {
                    input("credentials.email").enter(correctEmail);
                    expect(element('.popover.error').count()).toBe(0);
                });
            });
        });
        describe("and email is too short when min length is 3", function ()
        {
            it("should display popover with message", function ()
            {
                input("credentials.email").enter("ab");
                expect(element('.popover.error').count()).toBe(1);
            });
            describe("and email is correct", function ()
            {
                it("should display popover with message", function ()
                {
                    input("credentials.email").enter(correctEmail);
                    expect(element('.popover.error').count()).toBe(0);
                });
            });
        });

        describe("and email is too long when max length is 6", function ()
        {
            it("should display popover with message", function ()
            {
                input("credentials.email").enter(correctEmail + correctEmail);
                expect(element('.popover.error').count()).toBe(1);
            });
            describe("and email is correct", function ()
            {
                it("should display popover with message", function ()
                {
                    input("credentials.email").enter(correctEmail);
                    expect(element('.popover.error').count()).toBe(0);
                });
            });
        });

    });
});