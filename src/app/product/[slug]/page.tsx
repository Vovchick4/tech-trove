'use client'

import { use } from 'react'
import { useParams, notFound } from 'next/navigation'

const data = [{
    id: "test",
    name: "test",
}, { id: "test2", name: "test2" }]

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
        notFound();
    }

    return (
        <div>
            ProductInfo {slug}
            {JSON.stringify(findProduct)}
        </div>
    )
}
