class User {
  constructor(intra) {
    this.intra = intra;
  }

  me() {
    return this.intra.fetch('/user');
  }
}

module.exports = User;
