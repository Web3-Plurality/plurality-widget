# Plurality Reputation Connect Widget
This repo contains the functionality to load the plurality identity oracle as a popup widget.

## To run
```
npm install && npm run start
```

## To use it in a react project

Here is a basic demo how it can be used in any react project
```
import SocialConnect from 'plurality-social-connect';

const App = () => {
    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        console.log('Received data from widget:', data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
    };

    return (
        <div>
            <SocialConnect
                options={{ apps: 'facebook,twitter' }}
                onDataReturned={handleDataReturned}
                // all customization params are optional
                // customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
            />
        </div>
    );
};
```

## To publish new version on npm registry
- Update the version in `package.json` file
- Run `npm run webpack` and verify the `./lib/SocialConnect.js` file if it is updated
- Run `npm version` and verify if the version is updated correctly locally
- Run `npm publish` to publish it to public npm registry

## Customizable attributes
- ```height```: Specify the height of the button
- ```width```: Specify the width of the button
- ```initialBackgroundColor```: Specify the intial background color of the button
- ```initialTextColor```: Specify the intial text color of the button
- ```flipBackgroundColor```: Specify the flipped background color of the button
- ```flipTextColor```: Specify the flipped text color of the button

## Release
- The package is released on NPM registry via a build pipeline on merge to main

