class Projects {
  constructor(intra) {
    this.intra = intra;
  }

  get(params = {}) {
    const { startDate, endDate } = params;
    return new Promise((resolve, reject) => {
      this.intra.fetch('/module/board', {
        start: startDate,
        end: endDate
      })
      .then((activities) => {
        return resolve(activities.filter(project => project.type_acti_code == "proj"))
      })
      .catch(reject)
    })
  }
}

module.exports = Projects;
