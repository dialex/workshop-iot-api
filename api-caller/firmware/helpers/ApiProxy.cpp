#include "ApiProxy.h"

int ApiProxy::totalCalls = 0;

String ApiProxy::getMessage2() {
  return "btn2: Hello wanna-be-experts!";
  //return "btn2: meow meow!";
  //return "btn2: hoo-hoo-aah-aah!";
}

String ApiProxy::getMessage3() {
  return "btn3: equally spammy";
  //return "btn3: spammy cat";
  //return "btn3: spammy monkey";
}

String ApiProxy::getMessage4() {
  return "btn4: equally fast";
  //return "btn4: fast cat";
  //return "btn4: fast monkey";
}

bool ApiProxy::publishMessage(String message) {
  Particle.publish("Dev1Send-sendMessageToAWS", message, 60, PRIVATE);
  return true;
}

bool ApiProxy::publishMessageFail(String message) {
  totalCalls++;
  bool shouldSucceed = ((totalCalls % 3) == 0);

  if(shouldSucceed) {
    totalCalls = 0;
    return ApiProxy::publishMessage(message);
  } else {
    Particle.publish("Dev1Fail-sendMessageWhichFailsToAWS", message, 60, PRIVATE);
    return false;
  }
}
