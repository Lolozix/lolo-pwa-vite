import { warmStrategyCache } from "workbox-recipes";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { registerRoute } from "workbox-routing";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";

// Configurando o cache de páginas
const pageCache = new CacheFirst({
  cacheName: "primeiro-pwa-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // 30 dias
    }),
  ],
});

// Indicando o cache de página
warmStrategyCache({
  urls: ["/index.html", "/"],
  strategy: pageCache,
});

// Configurando o cache de assets (CSS, JS, Workers)
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Cache de imagens
const imageRouter = new Route(({ request }) => {
 return request.destination === "image",
}, new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }));

  registerRouter(imageRouter);

// Configurando offline fallback
offlineFallback({
  pageFallback: '/offline.html',
});
