class User {
  constructor(intra) {
    this.intra = intra;
  }

  me() {
    return this.intra.fetch('/user');
  }

  documents() {
    return this.intra.fetch(`/user/${this.intra.login}/document/`)
  }
}

module.exports = User;
