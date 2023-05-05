const Contatto = require('../../model/contatto.js');
const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Charset', 'UTF-8');

    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            const data = JSON.parse(body);
            if (!data.nome || !data.cognome || !data.sito_web) {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Fill every field' }));
                return;
            }
            const contatto = new Contatto();
            if (contatto.aggiungiContatto(data.nome, data.cognome, data.sito_web) === 1) {
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Registration completed' }));
                return;
            } else {
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Registration failed' }));
                return;
            }
        } catch (error) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: error.message }));
            return;
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
