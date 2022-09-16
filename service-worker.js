//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v45';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'index.html',
    'solution.html',
    'prix.html',
    'entreprise.html',
    'contact.html',
    'confirmation.html',
    'css/style.css',
    'css/normalize.css',
    'js/validation.js',
    'img/logo.png',
    'img/conf-message.png',
    'img/image-accueil.png',
    'img/img-people-dynam1.png',
    'img/img-people-dynam2.png',
    'img/wave-entreprise.png',
    'img/wave-price.png',
    'img/wave-solution.png',
    'img/icon-social-network/facebook.png',
    'img/icon-social-network/instagram.png',
    'img/icon-social-network/linkedin-logo.png',
    'img/icon-social-network/twitter.png',

    'img/need/img-need1.png',
    'img/need/img-need2.png',
    'img/need/img-need3.png',

    'img/partner/aqt.png',
    'img/partner/gestiplan.png',
    'img/partner/pme_montreal.jpg',
    'img/partner/reseautage_montreal.png',
    'img/partner/simplevu.png',

    'img/product/icon-analysis.png',
    'img/product/icon-api.png',
    'img/product/icon-comunication.png',
    'img/product/icon-configuration.png',
    'img/product/icon-customization.png',
    'img/product/icon-data-storage.png',
    'img/product/icon-moderation.png',
    'img/product/icon-module.png',
    'img/product/icon-security.png',
    'img/product/icon-team-work.png',

    'img/team/MatthieuSymoens.jpg',
    'img/team/SanaGhariani.jpg',
    'img/team/SergeBouzid.jpg'
];

self.addEventListener('install', (evt) => {
console.log('[ServiceWorker] Install');

// Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
    console.log('[ServiceWorker] Pre-caching offline page');
    return cache.addAll(FILES_TO_CACHE);
    })
    );
self.skipWaiting();
});




self.addEventListener('activate', (evt) => {
console.log('[ServiceWorker] Activate');

//Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
    return Promise.all(keyList.map((key) => {
    if (key !== CACHE_NAME) {
    console.log('[ServiceWorker] Removing old cache',
    key);
    return caches.delete(key);
    }
    }));
    })
    );
    
    self.clients.claim();
});


self.addEventListener('fetch', (evt) => {
    console.log('[ServiceWorker] Fetch', evt.request.url);
    //Add fetch event handler here.
    if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
    }
    evt.respondWith(
    fetch(evt.request)
    .catch(() => {
    return caches.open(CACHE_NAME)
    .then((cache) => {
    return cache.match('/tp3_site_resopeople/offline.html' );
    });
    })
    );
    });

