#include "InternetButton.h"

#ifndef API_PROXY
#define API_PROXY

class ApiProxy {
  public:
    static bool publishMessage(String message);
};

#endif
