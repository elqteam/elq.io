Modernizr.addTest("hyphens", Modernizr.testAllProps('hyphens'));

document.addEventListener("DOMContentLoaded", function(event) { 
  var elq = Elq();
  elq.use(elqBreakpoints);
  elq.use(elqMirror);
  elq.start(document.querySelectorAll("[elq]"));
});

// function createModule() {
//     var div = document.createElement("div");
//     div.className = "demo-module";
//     div.setAttribute("elq");
//     div.setAttribute("elq-breakpoints");
//     div.setAttribute("elq-breakpoints-width", "100 200");
//     return div;
// }