const fs = require("fs");
const {
  generateKeyPairSync,
  privateEncrypt,
  publicDecrypt,
} = require("crypto");
const crypto = require("crypto");
const generator = require("generate-password");
const constants = require("constants");

const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
    cipher: "aes-256-cbc",
    passphrase: "",
  },
});

fs.writeFileSync("../qrcode_secure_backend/private.pem", privateKey);
fs.writeFileSync("../qrcode_secure_backend/public.pem", publicKey);
fs.writeFileSync("../qrcode_secure_frontend/src/public_key.js", 


`const publicKey = \`` + publicKey + `\`; 
const _publicKey = publicKey;
export { _publicKey as publicKey };`



);

console.log("Keys generated");
