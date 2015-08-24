Modernizr.addTest("hyphens", Modernizr.testAllProps('hyphens'));

document.addEventListener("DOMContentLoaded", function(event) { 
    initResizeButtons();

    var elq = Elq();
    elq.use(elqBreakpoints);
    elq.use(elqMirror);
    elq.start(document.querySelectorAll("[elq]"));
});

function initResizeButtons(elq) {
    var resizeButtons = document.querySelectorAll("button[resize-target]");

    forEach(resizeButtons, function (button) {
        var targetId = button.getAttribute("resize-target");
        var target = document.getElementById(targetId);

        var sizesString = button.getAttribute("resize-sizes");
        var sizes = sizesString.split(" ").map(Number).filter(not.bind(null, isNaN));
        sizes.sort(function (a, b) { return a - b });

        function getDirection() {
            var width = getWidth(target);

            if (width >= sizes[sizes.length - 1]) {
                return "backward";
            } else {
                return "forward";
            }
        }

        var direction = getDirection();

        button.addEventListener("click", function resize() {
            function getNewWidth(width) {
                var newWidth;

                if (direction === "forward") {
                    forEach(sizes, function (size, index) {
                        if (width < size) {
                            newWidth = size;
                            return false;
                        }
                    });
                } else {
                    forEachRight(sizes, function (size, index) {
                        if (width > size) {
                            newWidth = size;
                            return false;
                        }
                    });
                }

                return newWidth;
            }

            var width = getWidth(target);

            var newWidth = getNewWidth(width);

            if (!newWidth) {
                if (direction === "backward") {
                    direction = "forward";
                } else {
                    direction = "backward";
                }

                newWidth = getNewWidth(width);
            }

            target.style.width = newWidth;
        });
    });
}

function getWidth(element) {
    return parseInt(getComputedStyle(element).width.replace("px", ""));
}

// function createModule() {
//     var div = document.createElement("div");
//     div.className = "demo-module";
//     div.setAttribute("elq");
//     div.setAttribute("elq-breakpoints");
//     div.setAttribute("elq-breakpoints-width", "100 200");
//     return div;
// }

function forEach(collection, callback) {
    if (collection.length) {
        for (var i = 0; i < collection.length; i++) {
            if (callback(collection[i], i) === false) {
                return;
            }
        }
    } else {
        for (var prop in collection) {
            if (collection.hasOwnProperty(prop)) {
                if(callback(collection[prop], prop) === false) {
                    return;
                }
            }
        }
    }
}

function forEachRight(collection, callback) {
    if (collection.length) {
        for (var i = collection.length - 1; i >= 0; i--) {
            if (callback(collection[i], i) === false) {
                return;
            }
        }
    } else {
        forEach(collection, callback);
    }
}

function not(fn, value) {
    return !fn(value);
}