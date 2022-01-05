const crypto = require('crypto');
const fs = require('fs');
const inputEncoding = 'utf8'; // Codificação da Entrada
var ascii85 = require('ascii85');


const generateQRCODEGenerico = async (req, res, next) => {

  const msg =
     "2.0;123;Qna 21 ;92861561563168;15mts;sem risco/100mts;10mts;Comercial;medidas;https://www.google.com/;80ad9d7745e876986965671bd1289b74;1592511537";

  encryptEGeraQRCODE(res, msg);
};

function encryptEGeraQRCODE(res, msg) {
  const hash = crypto.createHash('md5'); // Define o algoritmo de hashing (message digest)

  // Calcula o hash do conteúdo em texto claro.
  const contentHash = hash.update(msg).digest('hex');

  // Calcula e criptografa a data /hora da encriptação
  const dateTime = String(Math.floor(new Date() / 1000));

  outputAsString = `${msg};${contentHash};${dateTime}`;

  let encrypted = encryptString(outputAsString, './private.pem');


  var buf = ascii85.encode(encrypted);


  const QRCode = require('qrcode');

  QRCode.toDataURL(
    [{ data: buf, mode: 'byte' }],
    {
      errorCorrectionLevel: 'L',
      type: 'image/jpeg',
      quality: 1,
    },
    function (err, url) {
      if (err) {
        console.error(err);
      }

      res.send(`<img src="${url}" width="800px"/>`);
    }
  );
}

/**
 * A função realiza criptografia assimétrica utilizando uma chave privada existente.
 *
 * @param {string} plainText texto que será criptografado
 * @param {string} privateKeyFile caminho para o arquivo com a chave privada em formato PEM
 * @returns {string}
 */
function encryptString(plainText, privateKeyFile) {
  const privateKey = fs.readFileSync(privateKeyFile, inputEncoding);
  buffer = Buffer.from(plainText);

  const obj = {
    key: privateKey,
    passphrase: '',
  };

  const encrypted = crypto.privateEncrypt(obj, buffer);

  //const encrypted = crypto.privateEncrypt(privateKey, buffer);
  return encrypted;
}

module.exports = {
  generateQRCODEGenerico,
};
