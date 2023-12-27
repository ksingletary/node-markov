/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {}
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    for (let i = 0; i < this.words.length; i++){
      if (!this.chains[this.words[i]]){
        this.chains[this.word[i]] = [];
      }
      if (this.words[i+1]){
        this.chains[this.words[i]].push(this.words[i+1]);
      }
    }
    
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * keys.length)];
    let output = [];

    while (output.length < numWords && key != undefined) {
      output.push(key);
      key = this.chains[key][Math.floor(Math.random() * this.chains[key].length)];
    }

    return output.join(' ');
  }
}

const fs  = require('fs');

fs.readFile('eggs.txt', 'utf8', (err, data) => {
  if (err){
    console.error(err);
    return;
  }
  const markovMachine = new MarkovMachine(data);
  console.log(markovMachine.makeText());
});

module.exports = MarkovMachine;
