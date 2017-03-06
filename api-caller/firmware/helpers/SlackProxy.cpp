#include "SlackProxy.h"

String SlackProxy::getMessage() {
  return "btn2: Hello World!";
}

bool SlackProxy::publishMessage(String message) {
  Particle.publish("internetbutton-test", message, 60, PRIVATE);
  return true;
}
