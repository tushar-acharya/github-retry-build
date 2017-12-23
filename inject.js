function pageChangeListener() {
    var evt = document.createEvent("CustomEvent");
    evt.initCustomEvent("pageLoadTransition", true, true, null);
    document.dispatchEvent(evt);
}

document.addEventListener('pjax:success', pageChangeListener);
