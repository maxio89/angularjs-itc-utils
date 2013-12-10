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

        xit("should be no evaluation of submit function", function ()
        {
            /*TODO How to check it, use bind or catch some event?*/
//            Not implemented yet!
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

        xit("should emit event ...", function ()
        {
            /*TODO How to check it, inject $scope and $on?*/
            //            Not implemented yet!
        });

        xdescribe("when inputs has errors", function ()
        {
            it("should be focused first of them", function ()
            {
//                expect($('#email').focus()).toBeFocused();
            });
        });
    });
});