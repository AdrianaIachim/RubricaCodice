// Load base scripts
const { Sessione } = require('../../model/sessione');
const { errorHandler } = require('./errorHandler');

// Register error handlers
process.on('uncaughtException', errorHandler.handleException);
process.on('unhandledRejection', errorHandler.handleException);

// Parse request body
const data = JSON.parse(Buffer.from(request.body).toString());

// Check if email and password are provided
if (!data.email || !data.password) {
  response.status(400).json({ message: 'Informazioni inviate non corrette o insufficienti, contattare l\'amministratore per maggiori informazioni' });
  return;
}

// Create new session
const sessione = new Sessione();

try {
  sessione.creaSessione(data.email, data.password);
  response.status(200).json({ message: 'Sessione creata con successo' });
} catch (error) {
  errorHandler.handleError(error);
}
