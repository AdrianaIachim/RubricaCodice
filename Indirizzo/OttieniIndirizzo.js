// Carico gli script di base
// not necessary in Javascript

// Importo la classe Indirizzo
// assuming that the path is correct and the file is named "Indirizzo.js"
import Indirizzo from '../../model/Indirizzo.js';

// Definisco le funzioni di gestione degli errori
function handleException(error) {
  console.error('Exception:', error.message);
  // qui si dovrebbe fornire una risposta adeguata all'errore
}

function handleError(errorCode, errorMessage, errorFile, errorLine) {
  console.error(`Error (${errorCode}) in ${errorFile}, line ${errorLine}: ${errorMessage}`);
  // qui si dovrebbe fornire una risposta adeguata all'errore
}

// Imposto le funzioni di gestione degli errori
window.addEventListener('error', (event) => {
  event.preventDefault();
  handleError(event.error.errorCode, event.error.message, event.filename, event.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
  event.preventDefault();
  handleException(event.reason);
});

// Imposto l'header della risposta
const headers = new Headers();
headers.append('Content-type', 'application/json; charset=UTF-8');

// Ottengo l'id dalla query string
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (!id) {
  const errorMessage = 'No id passed';
  console.error(`Error: ${errorMessage}`);
  const response = JSON.stringify({ Message: errorMessage });
  console.log(response);
  return;
}

// Ottengo l'indirizzo corrispondente all'id specificato
const indirizzo = new Indirizzo();
indirizzo.ottieniIndirizzo(id)
  .then((result) => {
    // Se l'indirizzo esiste, lo restituisco come risposta
    if (result && result.id > 0) {
      const response = JSON.stringify(result, null, 2);
      console.log(response);
    } else {
      const errorMessage = 'No record';
      console.error(`Error: ${errorMessage}`);
      const response = JSON.stringify({ Message: errorMessage });
      console.log(response);
    }
  })
  .catch((error) => {
    handleException(error);
  });
