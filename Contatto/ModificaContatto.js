const Contatto = require('../../model/contatto');
const { json } = require('body-parser');

module.exports = function (app) {
  app.post('/api/modificaContatto', json(), (req, res) => {
    const { id, nome, cognome, sito_web } = req.body;

    if (!id || !nome || !cognome || !sito_web) {
      res.status(400).json({ message: 'Fill every field' });
      return;
    }

    const contatto = new Contatto();
    if (contatto.modificaContatto(id, nome, cognome, sito_web) === 1) {
      res.status(201).json({ message: 'Modify completed' });
    } else {
      res.status(400).json({ message: 'Modify failed' });
    }
  });
};
