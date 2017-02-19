#include "slack_helper.h"

String SlackHelper::getMessage() {
  return "Hello Brighton! It's a me, a Particle!";
}

void SlackHelper::publishMessage(String message) {
  Particle.publish("internetbutton-test", message, 60, PRIVATE);
  delay(1500);
}
