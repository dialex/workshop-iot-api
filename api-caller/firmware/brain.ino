#include "InternetButton.h"
#include "nyan_cat.h"
#include "ApiProxy.h"
#include "SlackProxy.h"

// ============
// Global stuff
// ============

// Heartbeat
#define ONE_MINUTE_MILLIS (60 * 1000)
unsigned long lastHeartbeat = millis();

// Daily clock sync
#define ONE_DAY_MILLIS (24 * 60 * 60 * 1000)
unsigned long lastSync = millis();

InternetButton b = InternetButton();
NyanCatMelody ncat = NyanCatMelody(b);

// =================
// LedHelper methods
// =================

int BLINK_TIMEOUT = 1000; //milliseconds

void ledsReset() {
  b.allLedsOff();
  b.setBrightness(60); // dims all leds (the're really brigth at 100%)
}

void ledsBlinkSuccess() {
  b.allLedsOn(0, 255, 0);
  delay(BLINK_TIMEOUT);
  ledsReset();
}

void ledsBlinkFailure() {
  b.allLedsOn(255, 0, 0);
  delay(BLINK_TIMEOUT);
  ledsReset();
}

void ledsDisplayResult(bool isSuccess) {
  if (isSuccess)
    ledsBlinkSuccess();
  else
    ledsBlinkFailure();
}

void ledsDisplayWait(int ledToLight = 1) {
  for (int i = 1; i <= 12; i++)
  {
    b.ledOn(ledToLight, 0, 0, 255);
    ledToLight = (ledToLight % 12) + 1;
    delay(100);
  }
  delay(200); //introduces a little wait for suspense
}

void preventSpamClicking() {
  b.setBrightness(30);
  b.allLedsOn(46, 46, 46);
  delay(5000); //prevents user from spamming button
  ledsReset();
}

// ================
// Particle's brain
// ================

void setup() {
  // Inits the internet button (runs once)
  ledsReset();
  b.begin();
  randomSeed(HAL_RNG_GetRandomNumber());
  // Visual feedback that particle is ready
  b.rainbow(4);
  ledsBlinkSuccess();
}

void loop(){
  // When you press the 1st button (12 o'clock)
  if(b.buttonOn(1)) {
    ncat.play();
    delay(BLINK_TIMEOUT);
  }
  // When you press the 2nd button (3 o'clock)
  else if(b.buttonOn(2)) {
    b.ledOn(3, 255, 255, 255);
    ledsDisplayWait(4);
    //DO SOMETHING
    String message = ApiProxy::getMessage2();
    bool isSuccess = ApiProxy::publishMessage(message);
    //SlackProxy::publishMessage(message);//EE device only
    ledsDisplayResult(isSuccess);
  }
  // When you press the 3rd button (6 o'clock)
  else if(b.buttonOn(3)) {
    b.ledOn(6, 255, 255, 255);
    ledsDisplayWait(7);
    //DO SOMETHING
    String message = ApiProxy::getMessage3();
    bool isSuccess = ApiProxy::publishMessageFail(message);
    SlackProxy::publishMessage(message + " (success? " + isSuccess + ")");//EE device only
    ledsDisplayResult(isSuccess);
  }
  // When you press the 4th button (9 o'clock)
  else if(b.buttonOn(4)) {
    b.ledOn(9, 255, 255, 255);
    ledsDisplayWait(10);
    //DO SOMETHING
    String message = ApiProxy::getMessage4();
    bool isSuccess = true;
    for (int i = 1; i <= 6; i++)
    {
      isSuccess = isSuccess && ApiProxy::publishMessage(message + " (" + i + " of 6)");
      //SlackProxy::publishMessage(message);//EE device only
    }
    ledsDisplayResult(isSuccess);
    preventSpamClicking();
  }
  ledsReset();

  // Tell Particle's cloud that device is still alive
  if (millis() - lastHeartbeat > ONE_MINUTE_MILLIS) {
    Particle.publish("spark/device/Photon-EEPT"); //device name
    lastHeartbeat = millis();
  }
  // Daily synchronize the internal clock
  if (millis() - lastSync > ONE_DAY_MILLIS) {
    Particle.syncTime();
    lastSync = millis();
  }
}
