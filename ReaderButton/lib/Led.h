#ifndef LED
#define LED
#include <application.h>
#include <string.h>

class Led {
  private:
    bool active;
    int red;
    int green;
    int blue;
  public:
    void setState(bool toggle);
    bool getState();
    void setRed(int value);
    int getRed();
    void setGreen(int value);
    int getGreen();
    void setBlue(int value);
    int getBlue();
    Led();
};

#endif
