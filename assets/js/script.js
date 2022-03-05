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

function getCharacterType(types) {

  // create variable to check if a character type was selected
  var typeCheck = false;

  // build character types object with boolean values set from user prompt function
  var characterTypes = {
    lowercase: promptType("lowercase"), 
    uppercase: promptType("uppercase"), 
    numeric: promptType("numeric"), 
    special: promptType("special")
  };

  // single function to handle multiple character type prompts
  function promptType(message) {
    var response = window.confirm("Would you like to include " + message + " characters?");
    if (response) {
      typeCheck = true;
    }
    return response;
  }

  // atleast one character type must have been selected. repeat function if not
  if (!typeCheck) {
    window.alert("You must choose at least one character type to include.")
    return getCharacterType();
  }

  console.log(typeCheck);
  return characterTypes;
}

function getPasswordInfo() {
  var passwordInfo = {
    characterLength: getCharacterLength(),
    characterTypes: getCharacterType()
  };
  console.log(passwordInfo.characterTypes.lowercase);
  console.log(passwordInfo.characterTypes.special);
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
