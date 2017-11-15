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
    return this.registered(event.scolaryear, event.codeModule, event.codeInstance, event.codeActi, event.codeEvent);
  }
}

module.exports = Events;
