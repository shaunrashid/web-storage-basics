/* jshint node: true */
/* globals localStorage, window, DOMException */

(function() {
    
    if(isStorageAvailable('localStorage')) {
        console.log("Local storage is available");
    } else {
        console.warn("Local storage is not available");
    }
    
})();

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