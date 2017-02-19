#ifndef NYAN_CAT
#define NYAN_CAT

class NyanCatMelody {
    InternetButton b;
  public:
    NyanCatMelody(InternetButton button) {
      b = button;
    }
    void play();
  private:
    bool isPaused();
    void otherTasks();
    void playSongAndProcess(String song);
};

#endif
