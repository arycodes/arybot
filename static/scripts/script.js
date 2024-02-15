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
    if (userMessageElements[userMessageElements.length - 2]) {

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
   
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/images/service_worker.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                });
            });
        }
   
}


let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll down
        header.style.top = `-${header.clientHeight}px`;
    } else {
        // Scroll up
        header.style.top = 0;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});




let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showInstallButton();
});

function showInstallButton() {
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
        });
    });
}