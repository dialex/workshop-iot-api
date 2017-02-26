#include "ApiProxy.h"

// Headers currently need to be set at init, useful for API keys etc.
http_header_t headers[] = {
    { "Accept" , "*/*"},
    { NULL, NULL } // NOTE: Always terminate headers will NULL
};

bool ApiProxy::publishMessage(String message) {
  http_request_t request;
  http_response_t response;
  HttpClient http;

  Particle.publish("internetbutton-test", "preparing request", 60, PRIVATE);
  delay(500);

  // Request path and body can be set at runtime or at setup.
  request.hostname = "localhost";
  request.port = 8080;
  request.path = "/api/auth/";
  //request.body = "{\"username\":\"testbash\", \"password\":\"brighton17\"}";

  Particle.publish("internetbutton-test", "request ready", 60, PRIVATE);
  delay(500);

  // Execute request
  //http.get(request, response, headers);
  http.post(request, response, headers);

  Particle.publish("internetbutton-test", response.body, 60, PRIVATE);
  delay(500);

  return false;
}
