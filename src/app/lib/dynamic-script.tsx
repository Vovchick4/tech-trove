'use client'

import { Fragment, useEffect } from 'react';
import 'preline/dist/preline.js'

function DynamicScriptComponent() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'preline/dist/preline.js';
        //script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <Fragment></Fragment>;
}

export default DynamicScriptComponent;