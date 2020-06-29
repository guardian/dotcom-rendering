import NodeCache from 'node-cache';

const cache = new NodeCache();

export const cacheAsync = <T>(
    fn: () => Promise<T>,
    ttlSec: number,
    key: string,
): [() => void, () => Promise<T>] => {
    const retFn = async (): Promise<T> => {
        const got = cache.get(key);
        if (got !== undefined) {
            return got as T;
        }

        const res = await fn();
        cache.set(key, res, ttlSec);
        return res;
    };

    const resetFn = (): number => cache.del(key);

    return [resetFn, retFn];
};
