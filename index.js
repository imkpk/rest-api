console.log("Express XML TO JSON");

const express = require("express");

const xmljson = require("xml-js");

const fs = require("fs").promises;

const app = express();

// XML Body parser
// https://gist.github.com/davidkrisch/2210498#gistcomment-887428
function anyBodyParser(req, res, next) {
  var data = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    data += chunk;
  });
  req.on("end", function () {
    req.rawBody = data;
    next();
  });
}

app.use(anyBodyParser);

app.post("/xml2json1", async (req, res) => {
  //   req.rawBody = "./file.xml";
  const xmlData = req.rawBody;
  //   const xmlData = req.rawBody;
  //   const xmlData = "./file.xml";

  // console.log(xmlData);

  // Converting XML to JSON
  // const json = JSON.parse(
  // xml2json.toJson(xmlData)
  // )
  let options = {
    compact: true,
    mergeAttrs: true
  };
  const json = xmljson.xml2json(xmlData, options);
  const jsonParse = JSON.parse(JSON.stringify(json));
  // console.log(jsonParse);

  const a = await fs.writeFile("db.json", jsonParse);

  // Send back the JSON
  res.send(json);
});

app.get("/", async (req, res) => {
  const fileData = await fs.readFile("db.json");
  res.send(JSON.parse(fileData));
});

// POST ROUTE 1
app.post("/xml2json", async (req, res) => {
  const xmlData = req.rawBody;

  console.log(xmlData);

  // Converting XML to JSON
  // const json = JSON.parse(
  //     xml2json.toJson(xmlData)
  // )
  let options = {
    compact: true,
    mergeAttrs: true
  };

  const json = xmljson.xml2json(xmlData, options);
  const a = await fs.writeFile("db.json", json);
  console.log(json);

  // Send back the JSON
  res.send(json);
});

// port to run the server on
// const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App stated on PORT: ${PORT}`);
});
