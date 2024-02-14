function convertMarkdownToHTML() {
    var userMessageElements = document.querySelectorAll('[class="messagecontent"]');

    userMessageElements.forEach(function (userMessageElement) {
        var userMessageMarkdown = userMessageElement.innerHTML
            .replace(/&quot;/g, '"')
            .replace(/&#34;/g, '"')
            .replace(/&#39;/g, "'");

        var userMessageHTML = marked.parse(userMessageMarkdown);
        userMessageElement.innerHTML = userMessageHTML;

    });
if (userMessageElements[userMessageElements.length - 2]){

    userMessageElements[userMessageElements.length - 2].setAttribute("id", "lastchat");
}
}

window.onload = convertMarkdownToHTML;
window.addEventListener('load', function () {
    scrollToElementById('lastchat');
});


function scrollToElementById(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}


