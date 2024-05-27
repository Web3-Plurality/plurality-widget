# Plurality Social Connect Widget
This repo contains the functionality to load the plurality identity oracle as a popup widget.

## To run
```
npm install && npm run start
```

## To use it in a react project

Here is a basic demo how it can be used in any react project
```
import PluralitySocialConnect from 'plurality-social-connect';

const App = () => {
    const childRef = useRef(null);
    // Handle the data returned from the widget
    const handleDataReturned = (data) => {
        const receivedData = JSON.parse(JSON.stringify(data))
        console.log("dapp receives:", receivedData);
        alert(JSON.stringify(data));
        childRef.current.closeSocialConnectPopup();
        // Handle the received data in the external webpage
        // ... (perform actions with the received data)
    };

    return (
        <div>
            <PluralitySocialConnect
                options={{ apps: 'facebook,twitter' }}
                onDataReturned={handleDataReturned}
                // all customization params are optional
                // customization={{ height: '200px', width: '500px', initialBackgroundColor: '#E8A123', initialTextColor: '#FFFFFF', flipBackgroundColor: '#12AE83', flipTextColor: '#FFFFFF'}}
                ref={childRef}
            />
        </div>
    );
};
```
## Calling web3 functions through the social connect

Since the Metamask gets connected to the social connect, all web3 calls also need to be done through the social connect.
You can use the following functions to call the blockchain layer:

### Get All Connected Accounts
Returns all accounts that have been connected through the social connect
```
PluralitySocialConnect.getAllAccounts() 
Returns: [0x123…, 0x456…]
```

### Get Current Connected Account
Get current account connected to the social connect
```
PluralitySocialConnect.getConnectedAccount() 
Returns: 0x123…
```

### Get Signature
Gets the message signed using the connected account and returns the signature
```
PluralitySocialConnect.getMessageSignature(message: string) 
Example:
PluralitySocialConnect.getMessageSignature("Example `personal_sign` message.")
```

### Verify Message Signature
Verify if the signature matches the message using the current connected account and returns boolean true or false
```
PluralitySocialConnect.verifyMessageSignature(message: string, signature: string) 
Example: PluralitySocialConnect.verifyMessageSignature("Example `personal_sign` message.", "0xa1379711716d214c84c146bbaa9d03d77895526b8620bcae67a76f824be6fd3a43795645a31f758eaed39ee6aa5490a979233711d4e9d6a2e30fa09a5e9c808a1b")
```
### Get Balance
Returns balance of the current account in wei. You need to convert it to required denomination yourself
```
PluralitySocialConnect.getBalance()
```

### Send Transaction
Send a certain amount (in ethers) to a certain address. Returns the transaction object
```
PluralitySocialConnect.sendTransaction(sendToAddress: string, value: string) 
Example:  PluralitySocialConnect.sendTransaction("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2","0.01")
```

### Get Block Number
Returns the latest block number
```
PluralitySocialConnect.getBlockNumber()
```

### Get Transaction Count
Returns the transaction count of the given address
```
PluralitySocialConnect.getTransactionCount(address: string) 
Example: PluralitySocialConnect.getTransactionCount("0xe613B4cd69Fe20E8bd0F0D79a264210886bA1AA2")
```

### Read from contract
Returns the response of executing the given get method of the contract with the given parameters
```
PluralitySocialConnect.readFromContract(contractAddress: string, abi: string, methodName: string, methodParams: string[]) 
Example:
   const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
PluralitySocialConnect.readFromContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937",abi,"retrieve", [])
```

### Write to contract
Returns the transaction response of executing the given write method of the contract with the given parameters
```
PluralitySocialConnect.writeToContract(contractAddress: string, abi: string, methodName: string, methodParam: string[]) 
Example:
   const abi = '[{"inputs":[],"name":"retrieve","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"num","type":"uint256"}],"name":"store","outputs":[],"stateMutability":"nonpayable","type":"function"}]';
PluralitySocialConnect.writeToContract("0x8E26aa0b6c7A396C92237C6a87cCD6271F67f937",abi, "store", "5")
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

