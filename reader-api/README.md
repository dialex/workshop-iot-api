# Reader device

## Installation:
Requires NodeJS v5.0.0 or later

1. Clone/Download folder
2. Run ```npm install```
2. Add in Particle API Token and Particle DeviceID into package.json
3. Run ```npm start```
4. Open browser and navigate to ```localhost:3000```

## Using the Reader

The reader device responds to voice commands so it's recommended you have a microphone handy.  To wake up the reader you must says:

```hello reader```

You can then give a series of other commands:

1. ```Toggle LED number one``` - This will turn on and turn off LED number one and all other LEDs mapped to it.  Can use the numbers 1 to 11.
2. ```LED number one equals LED number two``` - This will map LED number two to LED number one so that when LED number one is toggled, it will toggle LED number two as well.
3. ```Delete LED number one equals LED number two``` - This will delete the mapping you have previously created.
4. ```Reset mappings``` - This will reset all mappings in API and turn off all LEDs.
5. ```Set LED number two green``` - This will update the colour of the LED to green.  You can set it to red, green or blue.
