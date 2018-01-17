var Profile = require("./profile.js");

// Hanle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    // if url == "/" && GET
    if (request.url === "/") {
        // show search
        response.writeHead(200, { 'Content-Type': 'text/pplain' });
        response.write("Header\n");
        response.write("Search\n");
        response.end('Footer\n');
    }
    // if url == "/" && POST
    // redirect to /:username
}

function user(request, response) {
    // if url == "/..."
    const username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.write("Header\n");

        // get json from Treehouse
        let studentProfile = new Profile(username);
        // on "end"
        studentProfile.on("end", (profileJSON) => {
            // show profile

            // Store the value which we need
            const values = {
                avatarURL : profileJSON.gravatar_url,
                username : profileJSON.profile_name,
                badges : profileJSON.badges.length,
                javascriptPoints : profileJSON.points.JavaScript
            };
            //Simple reponse
            response.write(values.username + " has " + values.badges + " badges\n");
            response.end('Footer\n');
        });
        
        // on "error"
        studentProfile.on("error", (error) => {
            // show error
            response.write(error.message + "\n");
            response.end('Footer\n');
        });
    }
}

module.exports.home = home;
module.exports.user = user;