// Start Service
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// PWA Installation
let deferredPrompt;
const bannerInstall = document.getElementById('banner');

// Bind the close buttons
let cancelButton = document.getElementById('cancel-button');
cancelButton.addEventListener('click', () => {
    bannerInstall.style.display = "none";
    localStorage.setItem("timeRefreshed", 0);
});

// Prompt install Chrome
installApp = () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Installation acceptée');
            } else {
                console.log('Installation rejetée');
            }
            // Not reach pourquoi en fait?
            bannerInstall.style.display = "none";
            deferredPrompt = null;
        });
}

// Send the install banner before the install prompt
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Check if the user has been prompted to install the app every 5 refresh
    const timeRefreshed = parseInt(localStorage.getItem("timeRefreshed") || 5);
    if(timeRefreshed < 5) {
        localStorage.setItem("timeRefreshed", timeRefreshed + 1);
        return;
    }
    deferredPrompt = event;
    bannerInstall.style.display = "flex";
    let installButton = document.getElementById('install-button');
    installButton.addEventListener('click', installApp);
});

// On install event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed');
});