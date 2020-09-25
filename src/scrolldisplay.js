var curpos = 0;
var c = ['selectedpage', 'unselectedpage'];
var pages = 0;
var scrolldisplay = false;
var scrollwidth = 0;
function buildDisplay() {
    scrolldisplay.innerHTML = '';
    for (var i = 0; i < pages; i++) {
        if (i == curpos) scrolldisplay.innerHTML += `<div class="${c[0]}"></div>`;
        else scrolldisplay.innerHTML += `<div class="${c[1]}"></div>`;
    }
}

window.onresize = function() {
    scrollwidth = $('.about').width() + 32 + 5;
}

jQuery(function() {
    scrolldisplay = document.getElementsByClassName('scrolldisplay')[0];
    pages = $('.infopage').children().length;
    scrollwidth = $('.about').width() + 32 + 5;
    var page = document.getElementsByClassName('infopage')[0];
    buildDisplay();
    $('.infopage').scroll(function() {
        if (!scrolldisplay) return;
        var cur = Math.floor((page.scrollLeft - 16) / scrollwidth + 0.5);
        if (curpos == cur) return;
        curpos = cur;
        buildDisplay();
    });
})