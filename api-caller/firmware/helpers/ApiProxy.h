#include "InternetButton.h"
#include "HttpClient.h"

#ifndef API_PROXY
#define API_PROXY

class ApiProxy {
  public:
    static bool publishMessage(String message);
};

#endif
