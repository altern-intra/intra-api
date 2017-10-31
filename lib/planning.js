class Planning {
  constructor(intra) {
    this.intra = intra;
  }

  get(params = {}) {
    const { startDate, endDate } = params;
    return this.intra.fetch('/planning/load', {
      start: startDate,
      end: endDate,
    });
  }
}

module.exports = Planning;
