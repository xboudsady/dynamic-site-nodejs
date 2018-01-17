var Profile = require("./profile.js");
var renderer = require("./render.js");
var queryString = require('querystring');
var commonHeaders = { 'Content-Type': 'text/html' }

// Hanle HTTP route GET / and POST / i.e. Home
function home(request, response) {
    // if url == "/" && GET
    if (request.url === "/") {
        if (request.method.toLowerCase() === "get") {
            // show search
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        } else {
            // if url == "/" && POST

            // get the post data from body
            request.on("data", (postBody) => {
                // extrac the username
                var query = queryString.parse(postBody.toString());
                // redirect to /:username
                response.writeHead(303, {"Location": "/" + query.username});
                response.end();
                
            });
            
        }
    }
    
}

function user(request, response) {
    // if url == "/..."
    const username = request.url.replace("/", "");
    if (username.length > 0) {
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);

        // get json from Treehouse
        let studentProfile = new Profile(username);
        // on "end"
        studentProfile.on("end", (profileJSON) => {
            // show profile

            // Store the value which we need
            const values = {
                avatarUrl : profileJSON.gravatar_url,
                username : profileJSON.profile_name,
                badges : profileJSON.badges.length,
                javascriptPoints : profileJSON.points.JavaScript
            };
            //Simple response
            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();
        });
        
        // on "error"
        studentProfile.on("error", (error) => {
            // show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;