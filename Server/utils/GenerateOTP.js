const otpGenerator = require('otp-generator');

function generateOTP(length = 6) {
  const otp = otpGenerator.generate(length, { 
    digits: true, 
    alphabets: false, 
    upperCaseAlphabets: false, 
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return otp;
}

module.exports =  generateOTP;
