import fs from 'fs';
import readline from 'readline';

export default async function getCharacterGraphic(character) {
  const fileStream = fs.createReadStream('./graphics.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.character === character) {
      return obj;
    }
  }
}
