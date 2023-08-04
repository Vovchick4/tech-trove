import { notFound } from 'next/navigation'
import { Button } from '@/app/components';

const cache = new Map();

const data = [{
    id: "test",
    name: "test",
}, { id: "test2", name: "test2" }]

async function setToCache(key: string | string[], value: object | undefined) {
    if (!cache.has(key)) {
        await new Promise(resolve => {
            setTimeout(resolve, 200);
        });

        cache.set(key, value);
        return cache.get(key);
    }
    return cache.get(key);
}

async function getData(slug: string | string[]) {
    const response = data.find(({ id }) => id === slug);

    const dataFromCache = await setToCache(slug, response);

    return dataFromCache;
}

export default async function ProductInfo({ params: { slug } }: { params: { slug: string } }) {
    const findProduct = await getData(slug);

    if (findProduct === undefined) {
        notFound();
    }

    return (
        <div>
            ProductInfo {slug}
            {JSON.stringify(findProduct)}
            <Button type="button" color="danger" size="default" variant="solid">TexT</Button>
        </div>
    )
}
