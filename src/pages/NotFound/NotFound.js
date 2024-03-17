import React from 'react';
import { useEffect } from 'react';

//error message if page not found
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
