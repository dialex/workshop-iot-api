#include "InternetButton.h"
#include "nyan_cat.h"
#include "slack_helper.h"

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

int BLINK_TIMEOUT = 500; //milliseconds

void ledsReset() {
  b.allLedsOff();
  b.setBrightness(60); // dims all leds (the're really brigth at 100%)
}

void ledsBlinkSuccess() {
  b.allLedsOn(0, 255, 0);
  delay(BLINK_TIMEOUT);
  b.allLedsOff();
}

void ledsBlinkFailure() {
  b.allLedsOn(255, 0, 0);
  delay(BLINK_TIMEOUT);
  b.allLedsOff();
}

void ledsDisplayWait(int ledToLight = 1) {
  for (int i = 1; i <= 12; i++)
  {
    b.ledOn(ledToLight, 0, 0, 255);
    ledToLight = (ledToLight % 12) + 1;
    delay(100);
  }
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
    ledsDisplayWait(3);
    //DO SOMETHING
    /*String message = SlackHelper::getMessage();
    SlackHelper::publishMessage(message);
    ledsBlinkSuccess();
    delay(5000); //prevents user from spamming button*/
  }
  // When you press the 3rd button (6 o'clock)
  else if(b.buttonOn(3)) {
    b.ledOn(6, 255, 255, 255);
    ledsDisplayWait(6);
    //DO SOMETHING
  }
  // When you press the 4th button (9 o'clock)
  else if(b.buttonOn(4)) {
    b.ledOn(9, 255, 255, 255);
    ledsDisplayWait(9);
    //DO SOMETHING
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
