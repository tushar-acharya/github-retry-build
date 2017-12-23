function getActionBar() {
    return document.querySelector("#partial-new-comment-form-actions");
}

function retryButtonExists() {
    var actionBar = getActionBar();

    return actionBar.querySelector("#retry-build") != undefined;
}

function validateAndAddRetryButton() {
    if (getActionBar() == undefined) {
        return;
    }

    if (retryButtonExists()) {
        return;
    }

    var commentAndCloseButton = getActionBar().querySelector("button[name='comment_and_close']");
    var retryButton = createRetryButton();
    commentAndCloseButton.insertAdjacentElement('beforebegin', retryButton);
}

function process() {
    var parent = document.querySelector("#partial-new-comment-form-actions");

    if (parent) {
        parent.addEventListener('DOMSubtreeModified', validateAndAddRetryButton, false);
        document.addEventListener('DOMSubtreeModified', validateAndAddRetryButton, false);

        validateAndAddRetryButton();
    } else {
        parent.removeEventListener('DOMSubtreeModified', validateAndAddRetryButton, false);
        document.removeEventListener('DOMSubtreeModified', validateAndAddRetryButton, false);
    }
}

function createRetryButton() {
    var retryButton = document.createElement('button');
    retryButton.innerHTML = 'Retry Build';
    retryButton.className = "btn btn-primary";
    retryButton.setAttribute("id", "retry-build");
    retryButton.setAttribute("data-disable-with", "");
    retryButton.setAttribute("data-disable-invalid", "");
    retryButton.setAttribute("type", "button");
    retryButton.addEventListener('click', clickListener, true);

    return retryButton;
}

function clickListener() {
    document.querySelector("#new_comment_field").value = "test this please";
    var actionBar = document.querySelectorAll("#partial-new-comment-form-actions")[0]
    var commentButton;
    actionBar.querySelectorAll("button").forEach(function (node) {
        if (node.innerHTML.indexOf("Comment") >= 0) {
            commentButton = node;
        }
    });

    if (commentButton) commentButton.click();
}

window.addEventListener("pageLoadTransition", process);

var s = document.createElement('script');
s.src = chrome.extension.getURL('inject.js');
s.onload = function () {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

process();
