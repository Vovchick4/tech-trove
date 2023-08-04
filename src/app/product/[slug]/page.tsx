<<<<<<< HEAD
'use client'

import { use } from 'react'
import { useParams, notFound } from 'next/navigation'
=======
import { notFound } from 'next/navigation'

const cache = new Map();
>>>>>>> 6c466cf86bfc5efa370d8173d9d7b76b591d297a

const data = [{
    id: "test",
    name: "test",
}, { id: "test2", name: "test2" }]

<<<<<<< HEAD
async function getData(slug: string | string[]) {
    setTimeout(() => { }, 2000);

    const response = data.find(({ id }) => id === slug);

    if (!response) {
        return new Promise((reject) => {
            reject("Could not find");
        });
    }

    return response;
}

export default function ProductInfo() {
    const { slug } = useParams();
    const findProduct = use(getData(slug));

    if (typeof findProduct === "string") {
=======
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
>>>>>>> 6c466cf86bfc5efa370d8173d9d7b76b591d297a
        notFound();
    }

    return (
        <div>
            ProductInfo {slug}
            {JSON.stringify(findProduct)}
        </div>
    )
}
