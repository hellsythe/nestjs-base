import fs from 'fs';

class CopyFiles {
  constructor() {
    this.source = 'source.txt';
    this.destination = 'destination.txt';
  }

  copy() {
    fs.copyFileSync(this.source, this.destination);
  }
}