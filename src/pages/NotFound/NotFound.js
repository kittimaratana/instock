import React from 'react';
import { useEffect } from 'react';

export const NotFound = () => {
    useEffect(() => {
        document.title = 'Page Not Found';
    }, []);

    return (
        <div>
            <p>404 - Page Not Found</p>
        </div>
    )
}
