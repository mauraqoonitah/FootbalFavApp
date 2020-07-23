importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');


if (workbox) {
    console.log(`🎉🎉 Yay! Workbox is loaded 🎉🎉`);
    // workbox caching
    workbox.precaching.precacheAndRoute([
        { url: "./", revision: '5' },
        { url: "./nav.html", revision: '5' },
        { url: "./index.html", revision: '5' },
        { url: "./pages/favorite.html", revision: '5' },
        { url: "./pages/home.html", revision: '5' },
        { url: "./pages/klasemen.html", revision: '5' },
        { url: "./pages/teams.html", revision: '5' },
        { url: "./css/materialize.min.css", revision: '5' },
        { url: "./manifest.json", revision: '5' },
        { url: "./js/materialize.min.js", revision: '5' },
        { url: "./js/api.js", revision: '5' },
        { url: "./js/db.js", revision: '5' },
        { url: "./js/idb.js", revision: '5' },
        { url: "./js/nav.js", revision: '5' },
        { url: "./js/script.js", revision: '5' },
        { url: "./js/notification.js", revision: '5' },
        { url: "./push.js", revision: '5' },
        { url: "./img/icons/icon.png", revision: '5' },
        { url: "./img/icons/icon-72x72.png", revision: '5' },
        { url: "./img/icons/icon-96x96.png", revision: '5' },
        { url: "./img/icons/icon-128x128.png", revision: '5' },
        { url: "./img/icons/icon-144x144.png", revision: '5' },
        { url: "./img/icons/icon-152x152.png", revision: '5' },
        { url: "./img/icons/icon-192x192.png", revision: '5' },
        { url: "./img/icons/icon-384x384.png", revision: '5' },
        { url: "./img/icons/icon-512x512.png", revision: '5' },
        { url: "./img/background1.jpg", revision: '5' },
        { url: "./img/background2.jpg", revision: '5' },
        { url: "./img/background3.jpg", revision: '5' },
        { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: '5' },
        {
            url: "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
            revision: '5'
        }

    ]);
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'api-football-data.org',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [200],

                }),
                new workbox.expiration.Plugin({
                    maxEntries: 30,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
                }),
            ],
        })
    );


    // ROUTING DENGAN WORKBOX UNTUK SEMUA ASET DI BAWAH URI './'
    workbox.routing.registerRoute(
        new RegExp('./'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'caching-all'
        })
    );

    workbox.routing.registerRoute(
        /.*(?:png|gif|jpg|jpeg|svg|ico)$/,
        workbox.strategies.cacheFirst({
            cacheName: 'images-cache',
            plugins: [
                new workbox.cacheableResponse.Plugin({
                    statuses: [0, 200]
                }),
                new workbox.expiration.Plugin({
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                }),
            ]
        })
    );
    workbox.routing.registerRoute(
        /\.(?:js|css)$/,
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: 'static-resources',
        })
    );
    workbox.routing.registerRoute(
        new RegExp('/pages/'),
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'pages'
        })
    );

} else {
    console.log(`😬😬 Boo! Workbox didn't load 😬`);
}



// // INSTALL SW
// // membuat cache dan menyimpan berkas aset ke dalamnya.

// self.addEventListener("install", function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// // Event fetch akan menyala setiap waktu atau pada saat sebuah permintaan dikirim yaitu seperti API nya

// self.addEventListener("fetch", function(event) {
//     var base_url = "https://api.football-data.org/v2";

//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function(cache) {
//                 return fetch(event.request).then(function(response) {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         );

//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//                 return response || fetch(event.request);
//             })
//         )
//     }
// });

// // AKTIVASI SW
// // mengelola aset dari cache
// // membuang cache yang kadaluwarsa
// // mengirim permintaan untuk aset dan konten baru ke server

// self.addEventListener("activate", function(event) {
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName != CACHE_NAME) {
//                         console.log("ServiceWorker: cache " + cacheName + " telah dihapus");
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });