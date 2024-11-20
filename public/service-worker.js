const CACHE_NAME = "media-cache-v1"; // Nombre del caché, puedes cambiar la versión si es necesario

// Listado de extensiones de archivo que deseas cachear
const FILE_EXTENSIONS = [".mp4", ".mov", ".avi", ".jpg", ".jpeg", ".png"];

// Función para verificar si la URL pertenece a tu S3 específico
const isS3Url = (url) => {
  return url.startsWith("https://fanstreamcol.s3.eu-west-2.amazonaws.com/"); // Verifica que la URL comience con tu dominio de S3
};

// Event Listener para manejar las solicitudes de fetch
self.addEventListener("fetch", (event) => {
  const requestUrl = event.request.url;

  // Solo almacenar archivos con las extensiones específicas o aquellos provenientes de tu S3
  if (
    FILE_EXTENSIONS.some((ext) => requestUrl.endsWith(ext)) ||
    isS3Url(requestUrl)
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Si ya está en caché, devolver la respuesta almacenada
        if (cachedResponse) {
          return cachedResponse;
        }

        // Si no está en caché, hacer la solicitud y almacenar en el caché
        return fetch(event.request).then((response) => {
          // Verificamos que la respuesta sea válida
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }

          // Clonamos la respuesta para poder almacenarla en caché
          const responseClone = response.clone();

          // Abrir la caché y almacenar la respuesta clonada
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone); // Usamos event.request para almacenar la ruta completa
          });

          // Devolver la respuesta original para ser utilizada
          return response;
        });
      })
    );
  }
});
