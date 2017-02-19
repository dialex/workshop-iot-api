#include "InternetButton.h"

#ifndef SLACK_PROXY
#define SLACK_PROXY

class SlackProxy {
  public:
    static String getMessage();
    static void publishMessage(String message);
};

#endif
