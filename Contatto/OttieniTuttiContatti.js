// Load the required scripts
// Common.js contains the classes for handling exceptions and errors
import errorHandler from "../../common/errorHandler.js";
import Contatto from "../../model/contatto.js";

// Set the error and exception handlers
window.addEventListener("error", errorHandler.handleException);
window.addEventListener("unhandledrejection", errorHandler.handleException);

// Set the response header
const headers = new Headers();
headers.append("Content-Type", "application/json");

// Get the contact ID from the query string
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
if (!id) {
  console.log("No ID provided");
  const response = new Response(JSON.stringify({ message: "No ID provided" }), {
    status: 400,
    headers,
  });
  return response;
}

// Fetch the contacts from the server
const contatto = new Contatto();
const result = contatto.ottieniTuttiContatti(id);

const contatti = result.map((contact) => ({
  id: contact.id,
  cognome: contact.cognome,
  nome: contact.nome,
  sito_web: contact.sito_web,
}));

const response = new Response(JSON.stringify(contatti), {
  status: 200,
  headers,
});
return response;
