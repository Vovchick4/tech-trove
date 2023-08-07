'use client'

import { useEffect } from 'react';
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

    //return <div>This component loads a script dynamically.</div>;
}

export default DynamicScriptComponent;