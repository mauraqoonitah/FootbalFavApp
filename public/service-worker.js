importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


if (workbox) {
    console.log(`🎉🎉 Yay! Workbox is loaded 🎉🎉`);
    // workbox caching
    workbox.precaching.precacheAndRoute([
        { url: "/", revision: '1' },
        { url: "/nav.html", revision: '1' },
        { url: "/index.html", revision: '1' },
        { url: "/pages/favorite.html", revision: '1' },
        { url: "/pages/home.html", revision: '1' },
        { url: "/pages/klasemen.html", revision: '1' },
        { url: "/pages/teams.html", revision: '1' },
        { url: "/css/materialize.min.css", revision: '1' },
        { url: "/manifest.json", revision: '1' },
        { url: "/js/materialize.min.js", revision: '1' },
        { url: "/js/api.js", revision: '1' },
        { url: "/js/db.js", revision: '1' },
        { url: "/js/idb.js", revision: '1' },
        { url: "/js/nav.js", revision: '1' },
        { url: "/js/script.js", revision: '1' },
        { url: "js/notification.js", revision: '1' },
        { url: "/push.js", revision: '1' },
        { url: "/img/icons/icon.png", revision: '1' },
        { url: "/img/icons/icon-72x72.png", revision: '1' },
        { url: "/img/icons/icon-96x96.png", revision: '1' },
        { url: "/img/icons/icon-128x128.png", revision: '1' },
        { url: "/img/icons/icon-144x144.png", revision: '1' },
        { url: "/img/icons/icon-152x152.png", revision: '1' },
        { url: "/img/icons/icon-192x192.png", revision: '1' },
        { url: "/img/icons/icon-384x384.png", revision: '1' },
        { url: "/img/icons/icon-512x512.png", revision: '1' },
        { url: "/img/background1.jpg", revision: '1' },
        { url: "/img/background2.jpg", revision: '1' },
        { url: "/img/background3.jpg", revision: '1' },
        { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: '1' },
        {
            url: "https://fonts.gstatic.com/s/materialicons/v53/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
            revision: '1'
        }

    ]);
    workbox.routing.registerRoute(
        new RegExp('https://api.football-data.org/v2'),
        workbox.strategies.staleWhileRevalidate()
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