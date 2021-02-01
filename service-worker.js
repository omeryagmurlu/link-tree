importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.0.2/workbox-sw.js');

const { setDefaultHandler } = workbox.routing;
const { StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponsePlugin } = workbox.cacheableResponse;
const { googleFontsCache } = workbox.recipes;

setDefaultHandler(new StaleWhileRevalidate({
    plugins: [
        new CacheableResponsePlugin({
            statuses: [0, 200],
        }),
    ],
}));

googleFontsCache();