'use client'

import { useEffect, useState } from "react";

export default function useDocumentScrollEnd() {
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            console.log(document.documentElement);

            // Calculate the distance between the bottom of the viewport and the bottom of the document
            const distanceToBottom =
                document.documentElement.offsetHeight -
                (window.scrollY + window.innerHeight);

            // Define a threshold value (in pixels) to determine how close to the bottom we want to trigger the action
            const threshold = 75;

            // If the distance to the bottom is less than or equal to the threshold, we consider it as reaching the end
            if (distanceToBottom <= threshold) {
                // Perform your desired action here, such as loading more content
                setIsEnd(true);
            } else {
                setIsEnd(false);
            }
        });

        return () => {
            window?.removeEventListener('scroll', () => { });
        };
    }, []);

    return isEnd;
}
