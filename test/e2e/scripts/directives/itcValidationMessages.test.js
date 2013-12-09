'use strict';

describe("Show validation messages in popovers", function ()
{
    describe("when input has email type and email is wrong", function ()
    {
        it("should display popover with message", function ()
        {
            browser().navigateTo("/");
            input("credentials.email").enter("aaa");
            expect(element('.popover.error').count()).toBe(1);
        });
    });
});
//    expect(element.text()).toBe('this is the itcValidationMessages directive');