// crypto module
const crypto = require("crypto");

const fs = require('fs');

// Uint8Array
module.exports = {
    encrypt,
    decrypt
}

const algorithm = "aes-256-cbc"; 
// generate 16 bytes of random data
// Buffer.from("274094106656170bab9df29d3a5d25", 'utf8').toString('hex');
const initVector = Buffer.from("qwertyuiopasdfgh", 'utf8');

// protected data
// const message = "This is a secret message";

// secret key generate 32 bytes of random data
// const Securitykey = "be134e7b3f2636069c9dca0801444dc87d177f95609b463573e789e85a11271c";
const Securitykey = Buffer.from("qwertyuiopasdfghjklzxcvbnmqwerty", 'utf8');
// console.log(Securitykey)

// the cipher function
function encrypt(message) {
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

    let encryptedData = cipher.update(message, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    // console.log("Encrypted message: " + encryptedData);
    return encryptedData
}



function decrypt(message){
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

    let decryptedData = decipher.update(message, "hex", "utf-8");
    
    decryptedData += decipher.final("utf8");
    
    // console.log("Decrypted message: " + decryptedData);

    return decryptedData

}
module.exports