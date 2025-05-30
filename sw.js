const CACHE_NAME = 'reflex-ai-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/reflex.svg', // <<<=== Вот здесь заменена ссылка на твой локальный SVG
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        // Важно: если хотя бы один из этих файлов не будет найден,
        // установка сервис-воркера завершится ошибкой, и он не будет работать.
        // Убедись, что все локальные пути (вроде '/reflex.svg') верны и файлы существуют.
        return cache.addAll(urlsToCache)
          .catch(error => {
            console.error('Ошибка при добавлении файлов в кэш во время установки:', error);
            // Если установка падает из-за одного файла, SW не установится.
            // Можно попробовать кэшировать по одному, чтобы легче отловить проблемный файл:
            // return Promise.all(
            //   urlsToCache.map(url => {
            //     return cache.add(url).catch(err => {
            //       console.error('Не удалось закэшировать:', url, err);
            //     });
            //   })
            // );
          });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Если ресурс найден в кэше, возвращаем его.
        // Иначе (response = null), делаем запрос в сеть.
        return response || fetch(event.request);
      })
  );
});
