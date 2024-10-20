import * as fs from 'node:fs/promises';
import * as readline from 'readline';
import * as events from 'events';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();


export async function remplazeInFile(file, search, replace) {

  const contents = await fs.readFile(file, 'utf8');
  const regExp = new RegExp(search, 'gi')
  const updated = contents.replace(regExp, replace)

  await fs.writeFile(file, updated, 'utf-8', err2 => {
    if (err2) {
      throw Error(err2);
    }
  })
};

export function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

export const pascalCase = (str) =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1).toLowerCase())
    .join("");

export async function processLineByLine(filePath) {
  const lines = [];
  if (!fs.existsSync(filePath)) {
    throw new Error('La entidad no existe');
  }

  const fileStream = fs.createReadStream(filePath);

  const file = readline.createInterface({
    input: fileStream,
    output: process.stdout,
    terminal: false
  });

  file.on('line', (line) => {
    lines.push(line);
  });

  await events.once(file, 'close');


  return lines;
}

export async function addContentInLineToFile(file, content, lineNumber) {
  var data = fs.readFileSync(file).toString().split("\n");
  data.splice(lineNumber, 0, content);
  var text = data.join("\n");

  fs.writeFile('file.txt', text, function (err) {
    if (err) return console.log(err);
  });
}