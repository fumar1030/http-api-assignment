const respondJSON = (request, response, status, object) => {
    let contentType = 'application/json'
    let content;

    //Will parse the json into xml if requested to do so
    if (request.acceptedTypes.includes('text/xml')) {
        contentType = 'text/xml'
        content = `<response>\n`

        Object.keys(object).forEach((key) => {
            content += `  <${key}>${object[key]}</${key}>\n`;
          });
      
        content += `</response>`;
    }
    else{
        content = JSON.stringify(object);
    }
  
    response.writeHead(status, {'Content-Type': contentType});
    response.write(content);
    response.end();
  };
  

  const success = (request, response) => {
    const responseJSON = {
      message: 'This is a successful response',
    };
    respondJSON(request, response, 200, responseJSON);
  };

  const badRequest = (request, response) => {
    const responseJSON = {
      message: 'This request has the required parameters',
    };
  
    if (!request.query.valid || request.query.valid !== 'true') {
      responseJSON.message = 'Missing valid query parameter set to true';
      responseJSON.id = 'badRequest';
      return respondJSON(request, response, 400, responseJSON);
    }
  
    return respondJSON(request, response, 200, responseJSON);
  };

  const unauthorized = (request, response) => {
    const responseJSON = {
      message: 'This request has the required parameters',
    };

    if (request.query.loggedIn !== 'yes') {
        responseJSON.message = 'Missing loggedIn query parameter set to yes';
        responseJSON.id = 'unauthorized';
        return respondJSON(request, response, 401, responseJSON);
      }

    respondJSON(request, response, 200, responseJSON);
  };

  const forbidden = (request, response) => {
    const responseJSON = {
      message: 'You do not have access to this content',
      id: 'forbidden'
    };
    respondJSON(request, response, 403, responseJSON);
  };

  const internal = (request, response) => {
    const responseJSON = {
      message: 'Internal Server error. Something went wrong',
    };
    respondJSON(request, response, 500, responseJSON);
  };

  const notImplemented = (request, response) => {
    const responseJSON = {
      message: 'A get request for this page has not been implemented yet. Check again later for updated content',
    };
    respondJSON(request, response, 501, responseJSON);
  };
  
  const notFound = (request, response) => {
    const responseJSON = {
      message: 'The page you are looking for was not found.',
      id: 'notFound',
    };
      respondJSON(request, response, 404, responseJSON);
  };
  
  module.exports = {
    success,
    badRequest,
    notFound,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
  };