#include "InternetButton.h"

#ifndef API_PROXY
#define API_PROXY

class ApiProxy {
  private:
    static bool toggle;

  public:
    static String getMessage2();
    static String getMessage3();
    static String getMessage4();
    static bool publishMessage(String message);
    static bool publishMessageFail(String message);
};

#endif
