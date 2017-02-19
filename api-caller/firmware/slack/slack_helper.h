#include "InternetButton.h"

#ifndef SLACK_HELPER
#define SLACK_HELPER

class SlackHelper {
  public:
    static String getMessage();
    static String getGreetingMessage();
    static void publishMessage(String message);
    static void publishTestMessage(String message);
};

#endif
