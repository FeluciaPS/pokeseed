var fillSelectors = function() {
    var maxleg = document.getElementById("maxleg");
    for (var i = 0; i < 2; i++) {
        maxleg.innerHTML += `<option value="${i}">${i}</option>`;
    }
    maxleg.innerHTML += `<option value="-1" selected="selected">Unlimited</option>`;
    var minleg = document.getElementById("minleg");
    for (i = 0; i < 2; i++) {
        minleg.innerHTML += `<option value="${i}">${i}</option>`;
    }
    var maxavg = document.getElementById("maxavg");
    for (i = 0; i < 10; i++) {
        maxavg.innerHTML += `<option value="${i}">${i}</option>`;
    }
    maxavg.innerHTML += `<option value="-1" selected="selected">Unlimited</option>`;
    var minavg = document.getElementById("minavg");
    for (i = 0; i < 10; i++) {
        minavg.innerHTML += `<option value="${i}">${i}</option>`;
    }
    var maxbad = document.getElementById("maxbad");
    for (i = 0; i < 10; i++) {
        maxbad.innerHTML += `<option value="${i}">${i}</option>`;
    }
    maxbad.innerHTML += `<option value="-1" selected="selected">Unlimited</option>`;
    var minbad = document.getElementById("minbad");
    for (i = 0; i < 10; i++) {
        minbad.innerHTML += `<option value="${i}">${i}</option>`;
    }
    var mincom = document.getElementById("mincom");
    for (i = 0; i < 10; i++) {
        mincom.innerHTML += `<option value="${i}">${i}</option>`;
    }
    var maxcom = document.getElementById("maxcom");
    for (i = 0; i < 10; i++) {
        maxcom.innerHTML += `<option value="${i}">${i}</option>`;
    }
    maxcom.innerHTML += `<option value="-1" selected="selected">Unlimited</option>`;
    var compct = document.getElementById("compct");
    for (i = 0; i <= 100; i+=10) {
        compct.innerHTML += `<option value="${i}">${i}</option>`;
    }
}

$(document).ready(fillSelectors);