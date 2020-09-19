var fs = require("fs");

var textByLine = fs
  .readFileSync("src/Algorithms/TST/RandomWords.txt")
  .toString()
  .split("\n");

// get random word
function getRandomWord(min, max) {
  const filtered = textByLine.filter(
    (word) => word.charAt(0) >= min && word.charAt(0) <= max
  );

  const n = filtered.length;
  const rand = Math.floor(Math.random() * n);
  const word = filtered[rand];

  return word.substring(0, word.length - 1);
}

export default getRandomWord;
