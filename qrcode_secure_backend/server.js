var express = require("express");
var app = express();
const model_crypt = require('./db/model/model_crypt');
var cors = require("cors");
app.use(express.urlencoded({ extended: false }));

corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// const { password } = require("./conf");

app.listen(22633, () => {
  console.log("Server running on port 22633"); // Porta eh CBMDF em keypad https://en.wikipedia.org/wiki/Telephone_keypad#/media/File:Telephone-keypad2.svg
});

/**
 * Gera um QRCode genérico.
 */
app.get('/generateQRCODEGenerico', model_crypt.generateQRCODEGenerico);

