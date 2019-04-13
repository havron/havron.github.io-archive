if('serviceWorker' in navigator) {
navigator.serviceWorker
         .register('./service-worker.js',{ scope: '../~havron/' })
         .then(function() {});
}

'use strict';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./service-worker.js', { scope: '../~havron/' }).then(function(reg) {
      
      reg.onupdatefound = function() {
        var installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
						case 'activated':
							if (!navigator.serviceWorker.controller) {
             	 document.querySelector('.offline-ready').classList.add('active');
            	}
            case 'installed':
              if (navigator.serviceWorker.controller) {
                console.log('New or updated content is available. Please refresh.');
              } else {
                console.log('Content is now available offline!');
              }
              break;

            case 'redundant':
              console.error('The installing service worker became redundant.');
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  });
}
