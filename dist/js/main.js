Modernizr.addTest("hyphens", Modernizr.testAllProps('hyphens'));

//hyphenator polyfyll
// var Hyphenator_Loader=(function(window){'use strict';var languages,config,path,createElem=function(tagname){var r;if(window.document.createElementNS){r=window.document.createElementNS('http://www.w3.org/1999/xhtml',tagname);}else if(window.document.createElement){r=window.document.createElement(tagname);}return r;},loadNrunHyphenator=function(config){var head,script,done=false;head=window.document.getElementsByTagName('head').item(0);script=createElem('script');script.src=path;script.type='text/javascript';script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){done=true;Hyphenator.config(config);Hyphenator.run();script.onload=script.onreadystatechange=null;if(head&&script.parentNode){head.removeChild(script);}}};head.appendChild(script);},checkLangSupport=function(){var shadowContainer,shadow,lang,fakeBdy=createElem('body');shadowContainer=createElem('div');shadowContainer.style.visibility='hidden';fakeBdy.appendChild(shadowContainer);window.document.documentElement.appendChild(fakeBdy);for(lang in languages){if(languages.hasOwnProperty(lang)){shadow=createElem('div');shadow.style.MozHyphens='auto';shadow.style['-webkit-hyphens']='auto';shadow.style['-ms-hyphens']='auto';shadow.style.hyphens='auto';shadow.style.width='5em';shadow.style.lineHeight='12px';shadow.style.border='none';shadow.style.padding='0';shadow.style.wordWrap='normal';shadow.style['-webkit-locale']="'"+lang+"'";shadow.lang=lang;shadow.appendChild(window.document.createTextNode(languages[lang]));shadowContainer.appendChild(shadow);if(shadow.offsetHeight===12){loadNrunHyphenator(config);break;}}}fakeBdy.parentNode.removeChild(fakeBdy);};return{init:function(langs,p,configs){languages=langs;path=p;config=configs||{};checkLangSupport();}};}(window));
// Hyphenator_Loader.init(
//     {
//         "en": "hyphenationalgorithm"
//     },
//     "js/lib/Hyphenator.js",
//     {useCSS3hyphenation:true}
// );

document.addEventListener("DOMContentLoaded", function(event) { 
    initResizeButtons();

    var elq = Elq();
    elq.use(elqBreakpoints);
    elq.use(elqMirror);
    elq.start(document.querySelectorAll("[elq]"));

    var tabContainers=document.querySelectorAll('.tab-container');
    forEach(tabContainers, function (container) {
        tabs(container);
    });
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
            target.style.height = newWidth;
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