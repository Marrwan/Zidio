const bcrypt = require("bcryptjs");
const crypto = require("crypto")

const hashToken = async (token) => {
  let salt = await bcrypt.genSalt(10);
  let hashedToken = await bcrypt.hash(token, salt);

  return hashedToken;
};

const compareToken = async (string, hashed) => {
  let match = await bcrypt.compare(string, hashed);
  return match;
};

const generateRandomNumber = async (length) => {
  // Ensure the length is a positive integer
if (!Number.isInteger(length) || length <= 0) {
throw new Error('Length must be a positive integer');
}

// Calculate the range of possible values based on the length
const min = Math.pow(10, length - 1);
const max = Math.pow(10, length) - 1;

// Generate a random number within the specified range
const randomValue = await crypto.randomInt(min, max);

return randomValue;
}
module.exports = { hashToken, compareToken, generateRandomNumber };
