module.exports = {
    build: {
        "index.html": "index.html",
        "app.js": [
            "javascripts/app.js",
	        "javascripts/help.js"
        ],
        "app.css": [
            "stylesheets/app.css"
        ],
        "images/": "images/"
    },
    rpc: {
        host: "localhost",
        port: 8545
    }
};
