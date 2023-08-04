import { notFound } from 'next/navigation'
import { Button } from '@/app/components';
import { IProductData } from '@/app/api/schema/product';

const cache = new Map();

async function setToCache(key: string | string[], func: () => any) {
    if (!cache.has(key)) {
        cache.set(key, await func());
        return cache.get(key);
    }
    return cache.get(key);
}

async function getData(slug: string) {
    const dataFromCache = await setToCache(slug, async () => (await (await fetch(`http://localhost:3000/api/products?slug=${slug}`)).json()));

    return dataFromCache;
}

export default async function ProductInfo({ params: { slug } }: { params: { slug: string } }) {
    const findProduct = await getData(slug);

    if (findProduct === null) {
        notFound();
    }

    return (
        <div>
            ProductInfo {slug}
            <br />
            {JSON.stringify(findProduct)}
            <br />
            <Button type="button" color="danger" size="default" variant="solid">Solid btn</Button>
            <Button type="button" color="danger" size="default" variant="outline">Outline btn</Button>
            <Button type="button" color="danger" size="default" variant="ghost">Ghost btn</Button>
            <Button type="button" color="danger" size="default" variant="soft">Soft btn</Button>
        </div>
    )
}
