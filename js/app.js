function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) /* $(window).height() */ &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* $(window).width() */
    );
}

$(document).foundation();
$(document).ready(function() {
    var anchors = [
        $("#home")[0],
        $("#about")[0],
        $("#projects")[0],
        $("#contact")[0]
    ];

    var navItems = $(".nav li a");

    function findVisibleAnchor() {
        var result;
        anchors.forEach(function(item, index) {
            if (!isNaN(result)) {
                return;
            }
            var rect = item.getBoundingClientRect();
            // find the first rect with a positive top
            if (rect.top >= 0) {
                result = index;
            }
        });
        result -= 1;
        if (result < 0) {
            result = 0;
        }
        return $(navItems[result]);
    }

    var currentlySelected = findVisibleAnchor();
    currentlySelected.addClass("active");

    $(document).on("scroll", function() {
        var onScreen = findVisibleAnchor();
        if (onScreen !== currentlySelected) {
            currentlySelected.removeClass("active");
            onScreen.addClass("active");
            currentlySelected = onScreen;
        }
    });
});
