/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

function generateText(text) {
  const markovMachine = new MarkovMachine(text);
  console.log(markovMachine.makeText());
}

async function makeText(path) {
  let text;

  if (path.startsWith('http://') || path.startsWith('https://')) {

    try {
      let res = await axios.get(path);
      text = res.data;
      generateText(text);
    } catch (err) {
      console.error(`Error fetching ${path}:`, err.message);
      process.exit(1);
    }
  } else {

    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading ${path}:`, err.message);
        process.exit(1);
      } else {
        text = data;
        generateText(text);
      }
    });
  }
}

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('No file or URL provided');
  process.exit(1);
}

makeText(args[0]);
