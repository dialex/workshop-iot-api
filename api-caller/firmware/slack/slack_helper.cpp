#include "slack_helper.h"

String SlackHelper::getMessage() {
  /* DISCLAIMER
   * I know I should use an array of strings and get a rand string. Just you try to:
   * 1. Use declare a vector with const strings;
   * 2. Generate a random number based on current time;
   * 3. Get an element from the vector at a specific index;
   * 4. Convert that string to String (or is it String^)
   * Good luck with that #QSFD
   */
  switch (random(14) + 1) {
    case 1: return "*YumYum!* Estás com cara de AVC (Alta Vontade de Comer) :troll: (@here)";
    case 2: return "*YumYum!* Aproveita e faz uma pausa :walking: (@here)";
    case 3: return "*YumYum!* O último a chegar come bolos :laughing: (@here)";
    case 4: return "*YumYum!* Tu não és tu quando tens fome :wink: (@here)";
    case 5: return "*YumYum!* Senão és para comer não és para trabalhar, vai comer malandro! :laughing: (@here)";
    case 6: return "*YumYum!* A fome quando ferra faz-nos feras -- Mia Couto :grin: (@here)";
    case 7: return "*YumYum!* Roses are red, Violets are blue... vai mas é comer :rose: (@here)";
    case 8: return "*YumYum!* A fome é inimiga da refeição :sunglasses: (@here)";
    case 9: return "*YumYum!* :yum: (@here)";
    case 10: return "*YumYum!* Barriga cheia, bateria do tlm no máximo, vamos ao que interessa! :+1: (@here)";
    case 11: return "*YumYum!* Ninguém pode ser sábio de estômago vazio :thinking_face: (@here)";
    case 12: return "*YumYum!* Eu não vivo com fome, a fome é que vive em mim :troll: (@here)";
    case 13: return "*YumYum!* Esse vazio que sentes dentro de ti... é fome :grin: (@here)";
    case 14: return "*YumYum!* Penso, logo tenho fome :thinking_face: (@here)";
  }
}

String SlackHelper::getGreetingMessage() {
  return "Viva :wave: A partir de hoje vou avisar-vos sempre que o YumYum chegar :wink:";
}

void SlackHelper::publishMessage(String message) {
  //Particle.publish("internetbutton-test", message, 60, PRIVATE);
  Particle.publish("internetbutton-EEPT", message, 60, PRIVATE);
  delay(1500);
  Particle.publish("internetbutton-IDEIAhub", message, 60, PRIVATE);
  delay(1500);
}

void SlackHelper::publishTestMessage(String message) {
  Particle.publish("internetbutton-test", message, 60, PRIVATE);
  delay(1500);
}
