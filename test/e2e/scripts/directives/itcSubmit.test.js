'use strict';

describe("itcSubmit directive", function ()
{
    beforeEach(function ()
    {
        browser().navigateTo("/");
        element('#submit').click();
    });
    describe("when form is submitted", function ()
    {
        beforeEach(function ()
        {
            expect(element('#email').val()).toBe('');
            expect(element('#password').val()).toBe('');
            expect(element('#passwordConfirmation').val()).toBe('');
        });

        it("should lost the pristine state", function ()
        {
            expect(element('#registerForm').attr('class')).not().toContain('ng-pristine');
        });

        it("should obtain the dirty state", function ()
        {
            expect(element('#registerForm').attr('class')).toContain('ng-dirty');
        });

        it("should propagate dirty states to its inputs", function ()
        {
            expect(element('#email').attr('class')).toContain('ng-dirty');
            expect(element('#password').attr('class')).toContain('ng-dirty');
            expect(element('#passwordConfirmation').attr('class')).toContain('ng-dirty');
        });

        xdescribe("when inputs has errors", function ()
        {
            it("should be focused first of them", function ()
            {
                console.info(element("#email").html());
//                pause();
//                element("#email").query(function(elements, done) {
//                    elements.focus();
//                    done();
//                });
//                expect(element('#email')).toBeFocused();
            });
        });
    });
});