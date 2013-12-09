'use strict';

describe("Show validation messages in popovers", function ()
{
    describe("when input has email type and email is wrong", function ()
    {
        it("should display popover with message", function ()
        {
            browser().navigateTo("/");
            pause();
            input("credentials.email").enter("aaa");
            pause();
        });
    });
});
//    expect(element.text()).toBe('this is the itcValidationMessages directive');