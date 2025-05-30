const CACHE_NAME = 'reflex-ai-cache-v1';
const URLS_TO_CACHE = [
  './index.html',
  './style.css',
  './index.js',
  './auth.html', // Добавляем страницу авторизации, если она должна работать офлайн
  './admin.html', // Если админка тоже должна кэшироваться
  './reflex.svg',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js'
  // Примечание: кэширование Google Fonts может быть сложным из-за множества запросов.
  // Для простоты здесь мы на них не акцентируемся, браузер сам их кэширует.
  // Если критично, нужно будет добавлять конкретные .woff2 файлы шрифтов.
];

// Установка сервис-воркера
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэш открыт');
        return cache.addAll(URLS_TO_CACHE);
      })
      .catch(error => {
        console.error('Ошибка при кэшировании во время установки:', error);
      })
  );
});

// Обработка запросов (кэш сначала, потом сеть)
self.addEventListener('fetch', event => {
  // Пропускаем запросы не-GET (например, POST к API)
  if (event.request.method !== 'GET') {
    return;
  }

  // Пропускаем запросы к API для получения данных (они должны всегда идти в сеть)
  if (event.request.url.includes('/api/')) {
    return;
  }


  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Ресурс найден в кэше
        if (response) {
          return response;
        }

        // Ресурса нет в кэше, делаем сетевой запрос
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          networkResponse => {
            // Проверяем, что ответ корректный
            if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
              return networkResponse;
            }

            // Клонируем ответ, так как его можно использовать только один раз
            const responseToCache = networkResponse.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          }
        ).catch(error => {
          console.warn('Сетевой запрос не удался, ресурс не в кэше:', event.request.url, error);
          // Здесь можно вернуть страницу-заглушку для офлайна, если она есть в кэше
          // return caches.match('./offline.html');
        });
      })
  );
});

// Активация сервис-воркера и удаление старых кэшей
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]; // Только текущий кэш должен остаться
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
});
