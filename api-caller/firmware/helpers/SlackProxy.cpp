#include "SlackProxy.h"

String SlackProxy::getMessage() {
  return "Hello Brighton! It's a me, Particle!";
}

bool SlackProxy::publishMessage(String message) {
  Particle.publish("internetbutton-test", message, 60, PRIVATE);
  return true;
}
