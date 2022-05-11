module.exports = class Game {
  contentList = [];
  id = "";
  isOpen = true;
  inProgress = false;
  counter = 0;

  textAPI = "https://api.quotable.io/random";

  constructor(config) {
    this.id = config.id;
    this.isOpen = config.isOpen;
    this.inProgress = config.inProgress;
    s;
    this.counter = config.counter;
    //load 20 random quotes into contentList
    for (let i = 0; i < 20; i++) {
      this.contentList.push(this.getRandomQuote());
    }
  }

  get id() {
    return this.id;
  }
  get isOpen() {
    return this.isOpen;
  }
  get inProgress() {
    return this.inProgress;
  }

  countdown() {
    countdown = 30;
    currentTime = countdown;
    const countdownTimer = setInterval(() => {
      currentTime--;
      if (currentTime <= 0) {
        clearInterval(countdownTimer);
        this.stop();
      }
    }, 1000);
  }

  start() {
    this.inProgress = true;
    this.isOpen = false;
    this.countdown();
  }

  stop() {
    this.inProgress = false;
    this.isOpen = true;
    this.counter = 0;
  }

  getNextQuote(index) {
    if (index < this.contentList.length) {
      return this.contentList[index];
    } else {
      return this.contentList[0];
    }
  }
};
