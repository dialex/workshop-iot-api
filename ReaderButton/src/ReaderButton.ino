#include "InternetButton.h"
#include <ArduinoJson.h>
#include <Led.h>

InternetButton b = InternetButton();
Led state[11] = {};

void setup() {
    Serial.begin(9600);
    b.begin();

    Particle.function("toggle", toggle);
    Particle.function("colour", colour);
    Particle.function("reset", resetAll);
}

JsonObject& parseJson(String json){
  char jsonChar[json.length() + 1];
  json.toCharArray(jsonChar, json.length() + 1);

  StaticJsonBuffer<512> jsonBuffer;
  return jsonBuffer.parseObject(jsonChar);
}

int colour(String json){
  Serial.println("Received: " + json);
  JsonObject& root = parseJson(json);

  if (!root.success()) {
    return -1;
  }

  int id = int(root["id"]);
  state[id - 1].setRed(int(root["red"]));
  state[id - 1].setGreen(int(root["green"]));
  state[id - 1].setBlue(int(root["blue"]));

  return 1;
}

int toggle(String json){
  Serial.println("Received: " + json);
  JsonObject& root = parseJson(json);

  if (!root.success()) {
    return -1;
  }

  for(int c = 0; c < root["led"].size(); c = c + 1){
    int currentLed = int(root["led"][c]);

    if(!state[currentLed - 1].getState()){
      b.ledOn(currentLed, state[currentLed - 1].getRed(), state[currentLed - 1].getGreen(), state[currentLed - 1].getBlue());
      state[currentLed - 1].setState(true);
    } else {
      b.ledOff(currentLed);
      state[currentLed - 1].setState(false);
    }
  }

  return 1;
}

int resetAll(String json){
  Serial.println("Reseting leds");
  for(int l = 0; l < 12; l = l + 1){
    b.ledOff(l);
  }

  return 1;
}
