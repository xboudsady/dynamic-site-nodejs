const fs = require('fs');

function mergeValue(values, content) {
    // Cycle over the keys
    for (var key in values) {
        // Replace all {{key}} with the value from the values object
        content = content.replace("{{" + key + "}}", values[key]);
    }
    // return merged contents
    return content;
}

function view(templateName, values, response) {
    // Read from the template file
    var fileContents = fs.readFileSync('./views/' + templateName + '.html');
    // Insert values into the contents
    fileContents = mergeValues(values, fileContents);
    // Write out the contents to the response
    response.write(fileContents);
}

module.exports.view = view;