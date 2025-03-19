'use strict';

const crypto = require('crypto');
const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b"; // set random encryption key
const IV = "5183666c72eec9e4"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

const phrase = "who let the dogs out";

export const encrypt = (val) => {
    // Convert val to JSON string if it's not already
    const text = Array.isArray(val) ? JSON.stringify(val) : val.toString();

    let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

export const decrypt = (encrypted) => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    // Attempt to parse decrypted data as JSON
    try {
        return JSON.parse(decrypted);
    } catch (e) {
        return decrypted; // Return as string if parsing fails (likely it was a string or number)
    }
};
