class Projects {
  constructor(intra) {
    this.intra = intra;
  }

  get(params = {}) {
    const { startDate, endDate } = params;
    return new Promise((resolve, reject) => {
      this.intra.fetch('/module/board', {
        start: startDate,
        end: endDate,
      })
        .then(activities =>
        // This filter the project from the "module board". The result can differ from what you see
        // on your dashboard "projects" tab, because on the old intranet the project tab contains also the Meetings (bug ?)
          resolve(activities.filter(project => project.type_acti_code === 'proj')))
        .catch(reject);
    });
  }

  register(project, teamName) {
    return this.intra.submit(`/module/${project.scolaryear}/${project.codemodule}/${project.codeinstance}/${project.codeacti}/project/register`, {
      title: teamName,
    });
  }

  documents(project) {
    return this.intra.fetch(`/module/${project.scolaryear}/${project.codemodule}/${project.codeinstance}/${project.codeacti}/project/file/`);
  }

  // unregister(project) {
  //   console.log(project)
  //   return this.intra.submit(`/module/${project.scolaryear}/${project.codemodule}/${project.codeinstance}/${project.codeacti}/project/destroygroup`, {
  //   });
  // }
}

module.exports = Projects;
