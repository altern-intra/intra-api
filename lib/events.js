class Events {
  constructor(intra) {
    this.intra = intra;
  }

  // We are not allowed to see an event by itself, we can only access the registered page,
  // We need a lot of info to access this as in the old intranet, events are not independants
  registered(scolaryear, codeModule, codeInstance, codeActi, codeEvent) {
    return this.intra.fetch(`/module/${scolaryear}/${codeModule}/${codeInstance}/${codeActi}/${codeEvent}/registered`);
  }

  registeredByEvent(event) {
    if (!event.codeInstance) {
      return new Promise((resolve, reject) => {
        return resolve([]);
      })
    }
    const splitted = event.codeInstance.split('/');
    const instanceFormatted = `${splitted[splitted.length - 1]}-${event.semester}-1`;
    return this.registered(event.scolaryear, event.codeModule, instanceFormatted, event.codeActi, event.codeEvent);
  }
}

module.exports = Events;
