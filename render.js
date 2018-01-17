const fs = require('fs');

function view(templateName, values, response) {
    // Read from the template file
    const fileContents = fs.readFileSync('./views/' + templateName + '.html');
    // Insert values into the contents

    // Write out the contents to the response
    response.write(fileContents);
}

module.exports.view = view;