// PopupContent.js (Component for the Popup Window)
import React, { useEffect } from 'react';

const PopupContent = () => {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const originURL = urlParams.get('originURL');

        if (originURL) {
            const dataToSend = { exampleData: 'some data' };
            window.opener.postMessage(dataToSend, originURL);
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Hello, World!</h1>
            <p>This is the content displayed in the popup window.</p>
        </div>
    );
};

export default PopupContent;
