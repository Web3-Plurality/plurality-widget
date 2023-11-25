import React from 'react';
import PluralityPopupWidget from './PluralityPopupWidget';
//import PluralityPopupIframe from './PluralityPopupIframe';

const App = () => {
    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        console.log('Received data from widget:', data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
    };

    return (
        <div>
            {/* Render the widget component */}
            <PluralityPopupWidget
                options={{ apps: 'facebook,twitter' }}
                onDataReturned={handleDataReturned}
            />
        </div>
    );
};

export default App;
