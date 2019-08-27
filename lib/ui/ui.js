class UI {
  constructor() {
    this.isVerbose = false;
  }

  // function
  step(message, level = 0) {
    console.log("    ".repeat(level) + "|- " + message);
  }

  verbose(message, level = 0) {
    if (!this.isVerbose) {
      return;
    }
    console.log("    ".repeat(level) + "|- " + message);
  }
}

module.exports = new UI();
