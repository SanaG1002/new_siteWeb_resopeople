//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v16';

//Add list of files to cache here.
const FILES_TO_CACHE = [
    'offline.html',
    'index.html',
    'solution.html',
    'prix.html',
    'entreprise.html',
    'contact.html',
    'confirmation.html',

    
    'logo.png',
    'conf-message.png',
    'image-accueil.png',
    'img-people-dynam1.png',
    'img-people-dynam1.png',
    'wave-entreprise.png',
    'wave-price.png',
    'wave-solution.png',
    'icon-social-network/facebook.png',
    'icon-social-network/instagram.png',
    'icon-social-network/linkedin-logo.png',
    'icon-social-network/twitter.png',
    'need/img-need1.png',
    'need/img-need2.png',
    'need/img-need3.png',
    'partner/aqt.png',
    'partner/gestiplan.png',
    'partner/pme-montreal.jpg',
    'partner/reseautage_montreal.png',
    'partner/simplevu.png',
    'product/icon-analysis.png',
    'product/icon-api.png',
    'product/icon-comunication.png',
    'product/icon-configuration.png',
    'product/icon-customization.png',
    'product/icon-data-storage.png',
    'product/icon-moderation.png',
    'product/icon-module.png',
    'product/icon-security.png',
    'product/icon-team-work.png',
    'team/MatthieuSymoens.png',
    'team/SanaGhariani.png',
    'team/SergeBouzid.png',
    'scripts/validation.js'
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

