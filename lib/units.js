class Units {
  constructor(intra) {
    this.intra = intra;
  }

  all(params = {}) {
    let { instances } = params;
    const { startDate, endDate } = params;
    if (!instances) {
      ({ instances } = this.intra);
    }
    // There is no endpoint to display modules, so we take the planning and extract the modules from it
    const requestInstances = instances.map(instance => this.intra.fetch('/planning/load', {
      start: startDate,
      end: endDate,
      location: instance,
    }));
    return Promise.all(requestInstances)
      .then((modules) => {
        /* eslint-disable prefer-spread */
        let modulesFiltered = [].concat.apply([], modules);
        // Filter unique modules
        modulesFiltered = modulesFiltered
          .filter((module, index, self) =>
            self.findIndex(t => t.scolaryear === module.scolaryear &&
                           t.codemodule === module.codemodule &&
                           t.codeinstance === module.codeinstance)
            === index);
        return Promise.all(modulesFiltered.map(module => new Promise((resolve, reject) => {
          const targetModule = module;
          this.get(targetModule.scolaryear, targetModule.codemodule, targetModule.codeinstance)
            .then((moduleRegistered) => {
              const [result, registered] = moduleRegistered;
              result.registered = registered;
              if (result.registered instanceof Object) {
                result.registered = [];
              }
              resolve(result);
            })
            .catch(reject);
        })));
      });
  }

  get(scolarYear, codeModule, instance) {
    return Promise.all([
      this.intra.fetch(`/module/${scolarYear}/${codeModule}/${instance}`),
      this.intra.fetch(`/module/${scolarYear}/${codeModule}/${instance}/registered`),
    ]);
  }
}

module.exports = Units;
