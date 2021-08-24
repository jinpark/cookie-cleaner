function clearStorage() {
    Object.keys(localStorage).forEach((k) => {
        localStorage.removeItem(k);
    });
    sessionStorage.clear()
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.start == 'clearStorage') {
            clearStorage()
            sendResponse('cleared')
        }
    }
);