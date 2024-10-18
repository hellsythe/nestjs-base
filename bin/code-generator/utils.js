import * as fs from 'fs';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const kebabCase = string => string
  .replace(/([a-z])([A-Z])/g, "$1-$2")
  .replace(/[\s_]+/g, '-')
  .toLowerCase();


export async function remplazeInFile(file, search, replace) {

  await fs.readFile(file, 'utf-8', async (err, contents) => {
    if (err) {
      console.error(err)
    }

    // Replace string occurrences
    const regExp = new RegExp(search, 'gi')
    const updated = contents.replace(regExp, replace)

    // Write back to file
    fs.writeFile(file, updated, 'utf-8', err2 => {
      if (err2) {
        console.log(err2)
      }
    })
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