class Projects {
  constructor(intra) {
    this.intra = intra;
  }

  get() {
    return new Promise((resolve, reject) => {
      this.intra.fetch('/module/board', {
        start: "2017-10-23",
        end: "2017-12-30"
      })
      .then((activities) => {
        return resolve(activities.filter(project => project.type_acti_code == "proj"))
      })
      .catch(reject)
    })
  }
}

module.exports = Projects;
