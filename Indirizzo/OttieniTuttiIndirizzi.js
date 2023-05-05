// Import delle dipendenze
const Indirizzo = require('../../model/indirizzo');
const errorHandler = require('./errorHandler');

// Set degli handler delle eccezioni ed errori
process.on('uncaughtException', errorHandler.handleException);
process.on('unhandledRejection', errorHandler.handleException);
process.on('SIGTERM', errorHandler.handleTermination);
process.on('SIGINT', errorHandler.handleTermination);

// Set dell'header della risposta HTTP
const headers = {
  'Content-type': 'application/json',
  'charset': 'UTF-8'
};

// Verifica presenza del parametro ID nell'URL
if (!id) {
  console.log(JSON.stringify({ Message: 'No id passed' }));
  process.exit(1);
}

const indirizzo = new Indirizzo();
indirizzo.ottieniTuttiIndirizzi(id)
  .then((result) => {
    const indirizzi = result.map((item) => {
      return {
        id: item.id,
        cognome: item.cognome,
        nome: item.nome,
        sito_web: item.sito_web,
        comune: item.comune,
        provincia: item.provincia,
        codice_postale: item.codice_postale,
        tipo_via: item.tipo_via,
        via: item.via,
        descrizione: item.descrizione
      };
    });
    console.log(JSON.stringify(indirizzi, null, 2));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    console.log(JSON.stringify({ Message: 'No record' }));
    process.exit(1);
  });
