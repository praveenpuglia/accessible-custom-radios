//self invoking anon. function
$(function() {
    $(".icon-radio")
        .on("click", function() {
            //needed data
            var inputElement = $(this).next();
            var inputName = inputElement.attr("name");
            var radioGroup = $("input[name='" + inputName + "']");
            var iconGrop = radioGroup.prev();

            //handle click event with fake radios.
            inputElement.trigger("click").trigger("change");
            if (inputElement.is(":checked")) {
                iconGrop.removeClass("selected").removeAttr("tabindex");
                $(this).addClass("selected").attr("tabindex", 0).focus();
            } else {
                $(this).removeClass("selected");
            }
        })
        .on("focus", function(event) { //focusing using tab or click
            var inputElement = $(this).next();
            var inputName = inputElement.attr("name");
            var radioGroup = $("input[name='" + inputName + "']");
            var inputElementIndex = radioGroup.index(inputElement);

            $(this).on("keydown", function(event) {
                if (event.keyCode == 39 || event.keyCode == 40) { //right and bottom
                    var nextIconToSelect = radioGroup.eq(inputElementIndex + 1).prev();
                    if (nextIconToSelect.length !== 0) {
                        $(this).removeClass("selected").removeAttr("tabindex");
                        nextIconToSelect.addClass("selected").attr("tabindex", 0).focus()
                            .next().trigger("click").trigger("change");
                    }
                }
                if (event.keyCode == 37 || event.keyCode == 38) { //left and up
                    //necessary because $.eq() can take negative values and return elements.. we dont want that.
                    var indexOfNextItem = (inputElementIndex - 1 < 0) ? 0 : (inputElementIndex - 1);
                    if (inputElementIndex == indexOfNextItem) {
                        return;
                    }
                    var prevIconToSelect = radioGroup.eq(indexOfNextItem).prev();
                    if (prevIconToSelect.length !== 0) {
                        $(this).removeClass("selected").removeAttr("tabindex");
                        prevIconToSelect.addClass("selected").attr("tabindex", 0).focus()
                            .next().trigger("click").trigger("change");
                    }
                }
            });
        })
        .on("blur", function() {
            $(this).off("focus");
        });
})();
