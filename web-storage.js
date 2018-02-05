/* jshint node: true, browser: true */
/* globals DOMException */

(function() {
    
    if(isStorageAvailable('localStorage')) {
        var button = document.getElementById('save');

        button.addEventListener('click', function() {
            var username = document.getElementById('user-name').value;
            
            saveUserName(username);
        });
        
    } else {
        console.warn("Local storage is not available");
    }

})();


function saveUserName(username) {
    var storage = window.localStorage;
    storage.setItem('username', username);
}


/*
    Test to see if Web storage is supported and available.
    Taken from: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
*/

function isStorageAvailable(storageType) {
    
    try {
        var storage = window[storageType];
        var testItem = 'Storage Test Item';
        
        storage.setItem(testItem, testItem);
        storage.removeItem(testItem);
        return true;
    }
    
    catch(e) {
        
        /* Test the error code and name (because code might not be present) */
        
        return e instanceof DOMException && (
            e.code === 22 ||    // Everything except Firefox
            e.code === 1014 ||  // Firefox
            e.name === "QuotaExceededError",        // Everything except Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED" // Firefox
        ) && storageType.length !== 0;
    }
}