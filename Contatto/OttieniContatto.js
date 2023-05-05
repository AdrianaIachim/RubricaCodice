// Carico gli script di base
const Contatto = require('../../model/contatto');
const errorHandler = require('../../common/errorHandler');

setExceptionHandler(errorHandler.handleException);
setErrorHandler(errorHandler.handleError);

const id = new URLSearchParams(window.location.search).get('id');
if (!id) {
  console.error('No id passed');
  return;
}

const contatto = new Contatto();
contatto.ottieniContatto(id)
  .then(result => {
    if (result && result.id > 0) {
      console.log(JSON.stringify(result, null, 2));
    } else {
      console.error('No record');
    }
  })
  .catch(error => {
    console.error(error.message);
  });
