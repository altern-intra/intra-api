class Planning {
  constructor(intra) {
    this.intra = intra;
  }

  get() {
    return this.intra.fetch('/planning/load');
  }
}

module.exports = Planning;
