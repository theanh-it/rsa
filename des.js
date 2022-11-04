// mã hóa đối xứng

const crypto = require("crypto");

/**
 * Encrypt 3DES using Node.js's crypto module * 
 * @param data A utf8 string
 * @param key Key would be hashed by md5 and shorten to maximum of 192 bits,
 * @returns {*} A base64 string
 */
function encrypt3DES(data, key) {
  const md5Key = crypto.createHash('md5').update(key).digest("hex").substr(0, 24);
  const cipher = crypto.createCipheriv('des-ede3', md5Key, '');

  let encrypted = cipher.update(data, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

/**
 * Decrypt 3DES using Node.js's crypto module 
 * @param data a base64 string
 * @param key Key would be hashed by md5 and shorten to max 192 bits,
 * @returns {*} a utf8 string
 */
function decrypt3DES(data, key) {
  const md5Key = crypto.createHash('md5').update(key).digest("hex").substr(0, 24);
  const decipher = crypto.createDecipheriv('des-ede3', md5Key, '');

  let encrypted = decipher.update(data, 'base64', 'utf8');
  encrypted += decipher.final('utf8');
  return encrypted;
}

const data = {
    message: "success",
    data: {
        username: "theanhit",
        role: "admin",
        fullname: "Nguyễn Thế Anh"
    }
};

var hash = encrypt3DES(JSON.stringify(data), "theanhit");
console.log(hash);
console.log(decrypt3DES(hash, "theanhit"));
