var itHasBeenAtLeastOneSecond = false;
var loaded = false;

// setTimeout(function(){
//     itHasBeenAtLeastOneSecond = true;
//     turnOffSplashscreen();
// }, 1000);

document.addEventListener("DOMContentLoaded", function(event) { 
    initResizeButtons();

    var elq = Elq();
    elq.activate(document.querySelectorAll("[elq]"));

    var tabContainers = document.querySelectorAll(".tab-container");
    forEach(tabContainers, function (container) {
        tabs(container);
    });

    var navButton = document.querySelector(".nav-button");
    navButton.addEventListener("click", function(event){
        if(hasClass(navButton, "nav-button--is-open")) {
            event.preventDefault();
            window.history.pushState("intro", "", '/');
            window.scrollTo(0, 0);
        }

        toggleClass(navButton, "nav-button--is-open");
    });

    loaded = true;
    turnOffSplashscreen();
});

function turnOffSplashscreen() {
    var splashScreen = document.querySelector(".splashscreen");

    if(loaded && !hasClass(splashScreen, "splashscreen--off")) {
        addClass(splashScreen, "splashscreen--off");
        removeClass(document.querySelector("body"), "loading");
        fadeOut(document.querySelector(".splashscreen-text"));
    }
}

function initResizeButtons(elq) {
    var resizeButtons = document.querySelectorAll("button[resize-target]");

    forEach(resizeButtons, function (button) {
        var targetId = button.getAttribute("resize-target");
        var target = document.getElementById(targetId);

        var sizesString = button.getAttribute("resize-sizes");
        var dimensions = button.getAttribute("resize-dimensions") || "xy";

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

            var container = target.parentElement;
            var style = window.getComputedStyle(container, null);
            var containerPadding = parseInt(style.paddingLeft, 10) + parseInt(style.paddingRight, 10);
            var containerWidth = parseInt(style.getPropertyValue("width"), 10) - containerPadding;

            if(newWidth > containerWidth){
                direction = "backward";
                newWidth = getNewWidth(width);
            } else if (!newWidth) {
                if (direction === "backward") {
                    direction = "forward";
                } else {
                    direction = "backward";
                }

                newWidth = getNewWidth(width);
            }

            if(dimensions === "xy") {
                target.style.width = newWidth;
                target.style.height = newWidth;
            } else if(dimensions === "x") {
                target.style.width = newWidth;
            } else if(dimensions === "y") {
                target.style.height = newWidth;
            } else {
                console.error("invalid dimensions attribute");
            }
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

function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    else
        return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className);
    else
        el.className += ' ' + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className);
    else
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

function toggleClass(el, className) {
    if (el.classList) {
        el.classList.toggle(className);
    } else {
        var classes = el.className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

        el.className = classes.join(' ');
    }
}

// fade out

function fadeOut(el){
    onTransitionEnd(el, function(){
        el.style.display = "none";
    });

  addClass(el, "will-fade-out");
  addClass(el, "fade-out");
}

function getViewportWidth() {
    if (self.innerHeight) {
        return self.innerWidth;
    }

    if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }

    if (document.body) {
        return document.body.clientWidth;
    }
}

function onTransitionEnd(el, func) {
    el.addEventListener('transitionend', func);
    el.addEventListener('webkitTransitionEnd', func);
    el.addEventListener('otransitionend', func);
    el.addEventListener('oTransitionEnd', func);
    el.addEventListener('msTransitionEnd', func);
}
