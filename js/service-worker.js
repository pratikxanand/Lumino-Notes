const CACHE_NAME = "Lumino-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./css/notes.css",
  "./css/responsive.css",
  "./css/dashboard.css",
  "./css/recent.css",
  "./css/task.css",
  "./css/tasks.css",
  "./css/timer.css",
  "./css/ui.css",
  "./css/viewallnotes.css",

  "./js/web.js",
  "./js/notes.js",
  "./js/weather.js",
  "./js/tasks.js",
  "./js/timer.js",

  "./assets/logo-192.png",
  "./assets/logo-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});