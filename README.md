# Plurality Reputation connect widget
This repo contains the functionality to load the plurality identity oracle as a popup widget.

## To run
```
yarn install && yarn start
```

## To use it in a react project

Here is a basic demo how it can be used in any react project
```
const App = () => {
    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        console.log('Received data from widget:', data);
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
    };

    return (
        <div>
            <PluralityPopupWidget
                options={{ apps: 'facebook,twitter' }}
                onDataReturned={handleDataReturned}
            />
        </div>
    );
};
```

## To publish new version on npm registry
- Update the version in `package.json` file
- Run `npm run webpack` and verify the `./lib/PluralityPopupWidget.js` file if it is updated
- Run `npm version` and verify if the version is updated correctly locally
- Run `npm publish` to publish it to public npm registry

