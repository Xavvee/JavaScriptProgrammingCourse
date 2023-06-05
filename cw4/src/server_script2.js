import http from 'http';
import { URL } from 'url';
import { readCounter, writeCounter, handleCommand } from './console_script2.js';

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method.toUpperCase();

  if (method === 'GET' && url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Counter</title>
        </head>
        <body>
          <form method="POST">
            <label>
              Choose a read/write mode:
              <select name="mode">
                <option value="-">-</option>
                <option value="sync">sync</option>
                <option value="async">async</option>
              </select>
            </label>
            <br>
            <label>
              Command or text:
              <textarea name="input" rows="10"></textarea>
            </label>
            <br>
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);
    res.end();
    return;
  }

  if (method === 'POST' && url.pathname === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', async () => {
      const { mode, input } = parseFormData(body);

      if (mode === '-') {
        const result = await handleCommand(input);
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write(result);
        res.end();
      } else {
        const sync = mode === 'sync';
        const counter = parseInt(await readCounter(sync), 10);
        const newValue = counter + 1;
        await writeCounter(newValue, sync);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Counter</title>
            </head>
            <body>
              <p>Liczba uruchomień: ${newValue}</p>
            </body>
          </html>
        `);
        res.end();
      }
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.write('404 Not Found');
  res.end();
});

function parseFormData(body) {
  const fields = body.split('&');
  const formData = {};
  fields.forEach((field) => {
    const [name, value] = field.split('=');
    formData[name] = decodeURIComponent(value);
  });
  return formData;
}

server.listen(8000, () => {
  console.log('Server started at http://localhost:8000');
});