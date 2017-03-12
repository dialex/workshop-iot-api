#include "Led.h"
#include <application.h>
#include <string.h>

bool active = false;
int red = 255;
int green = 255;
int blue = 255;

Led::Led() : red(255), green(255), blue(255){}

void Led::setState(bool toggle){
  active = toggle;
}

bool Led::getState(){
  return active;
}

void Led::setRed(int value){
  red = value;
}

int Led::getRed(){
  return red;
}

void Led::setGreen(int value){
  green = value;
}

int Led::getGreen(){
  return green;
}

void Led::setBlue(int value){
  blue = value;
}

int Led::getBlue(){
  return blue;
}
