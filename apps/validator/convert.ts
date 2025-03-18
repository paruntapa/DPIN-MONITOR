const bs58 = require('bs58');

/**
 * Converts a Base58-encoded private key to a 64-byte array
 * @param {string} base58Key - The Base58 private key
 * @returns {Uint8Array} - The 64-byte private key array
 */
const privateKeyTo64Bytes = (base58Key: string) => {
    let keyBytes = bs58.decode(base58Key);

    if (keyBytes.length < 64) {
        let padded = new Uint8Array(64);
        padded.set(keyBytes);
        return padded;
    }

    return keyBytes.slice(0, 64);
};

// Example usage:
const privateKey = "";
const convertedKey = privateKeyTo64Bytes(privateKey);
console.log(convertedKey); // Uint8Array(64)
