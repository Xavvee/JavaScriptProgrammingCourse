import fs from 'fs-extra';
export { readCounter, writeCounter, handleCommand };
import readline from 'node:readline'

const fileName = 'counter.txt';

function readCounter(sync) {
  try {
    return sync ? fs.readFileSync(fileName, 'utf8') : fs.promises.readFile(fileName, 'utf8');
  } catch (err) {
    return '0';
  }
}

function writeCounter(value, sync) {
  if (sync) {
    fs.writeFileSync(fileName, value.toString(), 'utf8');
  } else {
    fs.promises.writeFile(fileName, value.toString(), 'utf8');
  }
}

async function handleCommand(cmd) {
  switch (cmd.trim()) {
    case 'ls':
      console.log(await fs.promises.readdir('.'));
      break;
    case 'date':
      console.log(new Date().toString());
      break;
    default:
      console.log(`Nieznana komenda: ${cmd.trim()}`);
  }
}

async function main() {
  // eslint-disable-next-line no-undef
  const sync = process.argv.includes('--sync');

  let counter = parseInt(await readCounter(sync), 10);
  console.log(`Liczba uruchomień: ${counter}`);

  counter += 1;
  writeCounter(counter, sync);

  // eslint-disable-next-line no-undef
  if (!process.argv.includes('--sync') && !process.argv.includes('--async')) {
    console.log('Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    for await (const line of rl) {
      await handleCommand(line);
    }
    console.log('Koniec wprowadzania danych');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});