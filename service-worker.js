//Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v1';

//Add list of files to cache here.
const FILES_TO_CACHE = [
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
    'facebook.png',
    'instagram.png',
    'linkedin-logo.png',
    'twitter.png',
    'img-need1.png',
    'img-need2.png',
    'img-need3.png',
    'aqt.png',
    'gestiplan.png',
    'pme-montreal.jpg',
    'reseautage_montreal.png',
    'simplevu.png',
    'icon-analysis.png',
    'icon-api.png',
    'icon-comunication.png',
    'icon-configuration.png',
    'icon-customization.png',
    'icon-data-storage.png',
    'icon-moderation.png',
    'icon-module.png',
    'icon-security.png',
    'icon-team-work.png',
    'MatthieuSymoens.png',
    'SanaGhariani.png',
    'SergeBouzid.png'
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
self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
console.log('[ServiceWorker] Fetch', evt.request.url);
//Add fetch event handler here.
});