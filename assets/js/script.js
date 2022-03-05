// Assignment code here
// prompts include:
// 1. length of password (between 8 and 128 characters)
// 2. lowercase?
// 3. uppercase?
// 4. numeric?
// 5. special characters?
// validate responses, atleast 1 character type should be selected

// prompt the user for password length and validate the response
function getCharacterLength() {
  var passwordLength = window.prompt("Please type the desired length of your password (must be between 8 and 128 characters long).");
  passwordLength = parseInt(passwordLength);
  if (passwordLength) {
    if (passwordLength < 8 || passwordLength > 128) {
      window.alert("Password length must be between 8 and 128 characters long.");
      return getCharacterLength();
    }
  }
  else {
    window.alert("You must enter a numeric value.")
    return getCharacterLength();
  }
  return passwordLength;
}

function getPasswordInfo() {
  var passwordInfo = {
    characterLength: getCharacterLength(),

  }

}

function generatePassword() {
  var passwordInfo = getPasswordInfo();
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
