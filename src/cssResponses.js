const fs = require('fs');

const styles = fs.readFileSync(`${__dirname}/../client/style.css`);

const getStyles = (request, response) => {
    response.writeHead(200, {'Content-Type': 'text/css'});
    response.write(styles);
    response.end();
};

module.exports.getStyles = getStyles;
