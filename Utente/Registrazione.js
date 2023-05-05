const Utente = require('../../model/utente');
const { json } = require('body-parser');

module.exports = function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const data = req.body;

  if (!data.email || !data.password) {
    res.status(400).json({ message: 'Fill every field' });
    return;
  }

  const utente = new Utente();
  if (utente.registrazione(data.email, data.password) === 1) {
    res.status(201).json({ message: 'Registration completed' });
  } else {
    res.status(400).json({ message: 'Registration failed' });
  }
}
