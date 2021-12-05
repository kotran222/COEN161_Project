const { MongoClient } = require('mongodb');
const path = require("path");
const fs = require("fs/promises");
const http = require("http");
const routeRequest = require("./route-request")
const sendResponse = require("./routes/utils/sendResponse");
// const uri = "mongodb+srv://scuvolleyball:<password>@scumensvolleyball.6jeuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const CommentsCollection = require("./mongodb/commentsCollection");

fs.readFile(path.join(__dirname, "mongo.config.json"), "utf-8")
  .then((contents) => {
    const mongoConfig = JSON.parse(contents);

    // const uri = [
    //   mongoConfig.scheme,
    //   `${mongoConfig.username}:${mongoConfig.password}`,
    //   `@${mongoConfig.address}/${mongoConfig.defaultDatabase}`,
    //   "?retryWrites=true&w=majority",
    // ].join("");

    // const client = new MongoClient(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });

    const uri = "mongodb+srv://scuvolleyball:scuvolleyball@scumensvolleyball.6jeuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });


    return client.connect().then(() => {
      return {
        db: CommentsCollection(client),
      };
    });
  })
  .catch((err) => {
    if (err.code === "ENOENT") {
      return {};
    }

    if (err instanceof SyntaxError) {
      console.error("DB is corrupted, cannot read as JSON");
      process.exit(1);
    }

    console.error(err);
    process.exit(1);
  })
  .then((appState) => {
    const server = http.createServer(function (req, res) {
      req.params = {};
      req.app = appState;

      console.log("Club Volleyball Server")

      const handler = routeRequest(req);
      if (handler === null) {
        return sendResponse(res, 404);
      } else {
        return handler(req, res);
      }
      
    });
// initialize server
    server.listen(8080);
  });


  // client.connect(err => {
  //   const collection = client.db("test").collection("devices");
  //   // perform actions on the collection object
  //   client.close();
  // });