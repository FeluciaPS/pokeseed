var output = {
    content: [],
    scrollmargin: 20,
    write: function(text, type) {
        if (text) {
            if (!type) type = '<span class="console log">[LOG] </span>';
            text = (type+text).replace(/\n/gi, '<br />      ');
            this.content.push(text);
        }
        var scroll = output.target.scrollHeight <= output.target.scrollTop + output.target.clientHeight + this.scrollmargin;
        output.target.innerHTML = this.content.join('<br />');
        if (scroll) output.target.scrollTo(0, output.target.scrollHeight);
    },
    err: function(text) {
        this.write(text, '<span class="console err">[ERR] </span>');
    },
    msg: function(text) {
        this.write(text, '<span class="console msg">[MSG] </span>');
    },
    warn: function(text) {
        this.write(`<div class="console wrn">${text}</div>`, '<span class="console wrn">[WRN] </span>');
    },
    clear: function() {
        this.content = [];
        this.write();
    },
    target: null
}

$(document).ready(() => {
    output.target = document.getElementById("output");
    output.write("This is the default console message. Should be overwritten");
})