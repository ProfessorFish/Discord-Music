module.exports = class db {
    constructor(filename) {
      this.filename = filename;
      this.filepath = ".." + "/dbs/" + filename
      this.data = require(this.filepath);
      console.log(("Loaded " + this.data.length + " data pieces from file " + this.filename + "!").bgBlack.green)
    }
    async save() {
      const fs = require("fs").promises;
      await fs.writeFile(this.filepath, JSON.stringify(this.data))
    }
}