const CACHE_NAME = 'reflex-ai-cache-v2'; // Не забудьте изменить версию кэша при обновлении файлов
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/auth.html',
  // Ваша SVG иконка с Glitch CDN
  'https://cdn.glitch.global/209e13d7-5228-4d40-9601-0a225164a2fe/reflex.svg?v=1746970198201',
  // Иконки и шрифты, которые используются в index.html
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
  // Добавьте сюда пути к вашим локальным PNG иконкам PWA
  // например: '/images/icons/icon-192x192.png',
  // '/images/icons/icon-512x512.png',
  // '/images/icons/icon-144x144.png'
];

// Установка сервис-воркера и кэширование статических ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Ошибка при кэшировании начальных ресурсов:', error);
      })
  );
  self.skipWaiting(); // Активировать новый сервис-воркер немедленно
});

// Активация сервис-воркера и удаление старых кэшей
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Удаление старого кэша:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Захватить контроль над открытыми клиентами
});

// Обработка запросов
self.addEventListener('fetch', event => {
  // Для навигационных запросов (HTML-страницы)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          if (response && response.ok && event.request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html');
            });
        })
    );
    return;
  }

  // Для остальных запросов (CSS, JS, изображения и т.д.)
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then(
          networkResponse => {
            if (networkResponse && networkResponse.ok && event.request.method === 'GET') {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Ошибка при запросе из сети (ресурс не в кэше):', error, event.request.url);
        });
      })
  );
});
