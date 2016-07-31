angular.module('myApp').service('JqueryProfileService', function() {

/*
 * Profile Edit Toggle
 */
if ($('[data-pmb-action]')[0]) {
    $('body').on('click', '[data-pmb-action]', function(e){
        e.preventDefault();
        var d = $(this).data('pmb-action');

        if (d === "edit") {
            $(this).closest('.pmb-block').toggleClass('toggled');
        }

        if (d === "reset") {
            $(this).closest('.pmb-block').removeClass('toggled');
        }

    });
}

/*
 * Collaspe Fix
 */
if ($('.collapse')[0]) {

    //Add active class for opened items
    $('.collapse').on('show.bs.collapse', function (e) {
        $(this).closest('.panel').find('.panel-heading').addClass('active');
    });

    $('.collapse').on('hide.bs.collapse', function (e) {
        $(this).closest('.panel').find('.panel-heading').removeClass('active');
    });

    //Add active class for pre opened items
    $('.collapse.in').each(function(){
        $(this).closest('.panel').find('.panel-heading').addClass('active');
    });
}

});

angular.module('myApp').service('JqueryAuthService', function() {
/*
 * Text Feild
 */
//Add blue animated border and remove with condition when focus and blur
if($('.fg-line')[0]) {
    $('body').on('focus', '.fg-line .form-control', function(){
        $(this).closest('.fg-line').addClass('fg-toggled');
    })

    $('body').on('blur', '.form-control', function(){
        var p = $(this).closest('.form-group, .input-group');
        var i = p.find('.form-control').val();

        if (p.hasClass('fg-float')) {
            if (i.length == 0) {
                $(this).closest('.fg-line').removeClass('fg-toggled');
            }
        }
        else {
            $(this).closest('.fg-line').removeClass('fg-toggled');
        }
    });
}
});