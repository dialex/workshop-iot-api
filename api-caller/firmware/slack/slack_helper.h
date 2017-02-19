#include "InternetButton.h"

#ifndef SLACK_HELPER
#define SLACK_HELPER

class SlackHelper {
  public:
    static String getMessage();
    static void publishMessage(String message);
};

#endif
