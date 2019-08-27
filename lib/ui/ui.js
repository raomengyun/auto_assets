class UI {
  constructor() {
    this.isVerbose = false;
  }

  // function
  step(message, level = 0) {
    console.log("    ".repeat(level) + "|- " + message);
  }

  error(message) {
    console.log(message);
    const process = require("process");
    process.exit(-1);
  }

  verbose(message, level = 0) {
    if (!this.isVerbose) {
      return;
    }
    console.log("    ".repeat(level) + "|- " + message);
  }

  warning(message, level) {
    console.log("    ".repeat(level) + "|- [WARNING]" + message);
  }
}

module.exports = new UI();
