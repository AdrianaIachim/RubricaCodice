// Import required modules
const { Email } = require('../../model/email');
const { errorHandler } = require('../../common/errorHandler');

// Set error and exception handlers
process.on('uncaughtException', errorHandler.handleException);
process.on('unhandledRejection', errorHandler.handleException);
process.on('uncaughtException', errorHandler.handleError);
process.on('unhandledRejection', errorHandler.handleError);

// Set headers
const headers = {
  'Content-type': 'application/json; charset=UTF-8'
};

// Get email ID from query parameters
const id = Number.parseInt(req.query.id);

if (isNaN(id)) {
  res.writeHead(400, headers);
  res.end(JSON.stringify({ Message: 'No id passed' }));
}

const email = new Email();
const result = await email.ottieniEmail(id);
if (result.id > 0) {
  res.writeHead(200, headers);
  res.end(JSON.stringify(result, null, 2));
} else {
  res.writeHead(404, headers);
  res.end(JSON.stringify({ Message: 'No record' }));
}
