var crypto = require('crypto');
var fs = require('fs');

function p(v){
  console.log(v);
}

f=fs.readFileSync('/usr/bin/nautilus')
//p(f)

var AESCrypt = {};
 
AESCrypt.decrypt = function(cryptkey, iv, encryptdata) {
    encryptdata = new Buffer(encryptdata, 'base64').toString('binary');
 
    var decipher = crypto.createDecipheriv('aes-256-cbc', cryptkey, iv),
        decoded = decipher.update(encryptdata, 'binary', 'utf8'); 
    decoded += decipher.final('utf8');
    return decoded;
}
 
AESCrypt.encrypt = function(cryptkey, iv, cleardata) {
    var encipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv),
        encryptdata = encipher.update(cleardata, 'utf8', 'binary');
 
    encryptdata += encipher.final('binary');
    encode_encryptdata = new Buffer(encryptdata, 'binary').toString('base64');
    return encode_encryptdata;
}
 
var cryptkey   = crypto.createHash('sha256').update('Nixnogen').digest(),
    iv         = 'a2xhcgAAAAAzAAAA',
    buf        = f, // 32 chars
    enc        = AESCrypt.encrypt(cryptkey, iv, buf);
var dec        = AESCrypt.decrypt(cryptkey, iv, enc);


fs.writeFileSync('nau', dec)
//console.warn("encrypt length: ", enc.length);
//console.warn("encrypt in Base64:", enc);
//console.warn("decrypt all: " + dec); 
 

