// Import necessary modules
const { Email } = require("../../model/email");
const { errorHandler } = require("../../common/errorHandler");

// Set up error handling
process.on("uncaughtException", errorHandler.handleException);
process.on("unhandledRejection", errorHandler.handleException);
process.on("exit", errorHandler.handleShutdown);

// Set content type
const headers = {
  "Content-Type": "application/json; charset=UTF-8",
};

// Get ID from query string
const id = parseInt(req.query.id);

if (isNaN(id)) {
  res.writeHead(400, headers);
  res.end(JSON.stringify({ Message: "No id passed" }));
  return;
}

// Get emails by ID
const email = new Email();
const result = email.ottieniTutteEmail(id);

const emails = [];
for (let i = 0; i < result.length; i++) {
  const mail = {
    id: result[i].id,
    cognome: result[i].cognome,
    nome: result[i].nome,
    sito_web: result[i].sito_web,
    indirizzo: result[i].indirizzo,
    descrizione: result[i].descrizione,
  };
  emails.push(mail);
}

// Return emails as JSON
res.writeHead(200, headers);
res.end(JSON.stringify(emails));
