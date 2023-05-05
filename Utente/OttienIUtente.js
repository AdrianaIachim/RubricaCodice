// Load basic scripts
const { Utente } = require('../../model/utente');
const { errorHandler } = require('../../common/errorHandler');

// Import Session class
const { Sessione } = require('../../model/sessione');

// Register exception and error handlers
process.on('uncaughtException', errorHandler.handleException);
process.on('unhandledRejection', errorHandler.handleException);
process.on('warning', errorHandler.handleError);

const id = new URLSearchParams(window.location.search).get('id');
if (!id) {
  console.log(JSON.stringify({ Message: 'No id passed' }));
  return;
}

const utente = new Utente();
utente.ottieniUtente(id)
  .then(result => {
    result = JSON.parse(JSON.stringify(result));
    if (parseInt(result.id) > 0) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.log(JSON.stringify({ Message: 'No record' }));
    }
  })
  .catch(error => {
    console.log(JSON.stringify({ Message: error.message }));
  });
