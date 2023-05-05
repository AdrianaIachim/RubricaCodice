const Contatto = require('../../model/contatto');
const http = require('http');

http.createServer((req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (data.id) {
          const contatto = new Contatto();
          const result = contatto.eliminaContatto(data.id);

          if (result === 1) {
            res.writeHead(201, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ message: 'Elimination completed' }));
          } else {
            res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
            res.end(JSON.stringify({ message: 'Elimination failed' }));
          }
        } else {
          res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
          res.end(JSON.stringify({ message: 'Fill every field' }));
        }
      } catch (error) {
        console.error(error);
        res.writeHead(400, { 'Content-Type': 'application/json; charset=UTF-8' });
        res.end(JSON.stringify({ message: 'Invalid input' }));
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json; charset=UTF-8' });
    res.end(JSON.stringify({ message: 'Method not allowed' }));
  }
}).listen(8080);
