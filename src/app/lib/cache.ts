const cache = new Map();

export default async function setToCache(key: string | string[], func: () => any) {
    if (!cache.has(key)) {
        cache.set(key, await func());
        return cache.get(key);
    }
    return cache.get(key);
}