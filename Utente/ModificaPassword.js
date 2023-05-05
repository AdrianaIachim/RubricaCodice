const Utente = require('../../model/utente');
const { create } = require('domain');
const { request } = require('http');

header("Content-type: application/json; charset=UTF-8");

const data = JSON.parse(request.body);

if (!data.id || !data.newPassword) {
  http_response_code(400);
  console.log(JSON.stringify({message: "Fill every field"}));
  process.exit();
}

const utente = new Utente();
if (utente.modificaPassword(data.id, data.newPassword) === 1) {
  http_response_code(201);
  console.log(JSON.stringify({message: "Change completed"}));
  process.exit();
} else {
  http_response_code(400);
  console.log(JSON.stringify({message: "Change failed"}));
  process.exit();
}
