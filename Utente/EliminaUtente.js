import Utente from '../../model/utente.js';

const headers = new Headers({
  "Content-type": "application/json; charset=UTF-8"
});

const data = {
  id: // set the id value here
};

if (!data.id) {
  const error = {
    message: "Fill every field"
  };
  throw new Error(JSON.stringify(error));
}

const utente = new Utente();
utente.eliminaUtente(data.id)
  .then(response => {
    if (response === 1) {
      const message = {
        message: "Elimination completed"
      };
      console.log(JSON.stringify(message));
    } else {
      const error = {
        message: "Elimination failed"
      };
      throw new Error(JSON.stringify(error));
    }
  })
  .catch(error => {
    console.error(error);
  });
