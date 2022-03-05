// Assignment code here
// prompts include:
// 1. length of password (between 8 and 128 characters)
// 2. lowercase?
// 3. uppercase?
// 4. numeric?
// 5. special characters?
// validate responses, atleast 1 character type should be selected

// GLOBAL VARIABLES
// create lists of possible characters for each type
var lowercaseOptions = "abcdefghijklmnopqrstuvwxyz";
var uppercaseOptions = lowercaseOptions.toUpperCase();
var numericOptions = "123456789";
// not allowing spaces or " character
var specialOptions = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

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
};

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
  };

  // atleast one character type must have been selected. repeat function if not
  if (!typeCheck) {
    window.alert("You must choose at least one character type to include.")
    return getCharacterType();
  }

  return characterTypes;
};

function generatePassword() {
  // generate password criteria
  var passwordInfo = {
    characterLength: getCharacterLength(),
    characterTypes: getCharacterType()
  };
  
  // build a complete list of character options based on given criteria
  characters = "";
  if (passwordInfo.characterTypes.lowercase) {
    characters = characters + lowercaseOptions;
  }
  if (passwordInfo.characterTypes.uppercase) {
    characters = characters + uppercaseOptions;
  }
  if (passwordInfo.characterTypes.numeric) {
    characters = characters + numericOptions;
  }
  if (passwordInfo.characterTypes.special) {
    characters = characters + specialOptions;
  }

  var password = buildPassword(passwordInfo, characters);

  return password;
};

function buildPassword (passwordInfo, characters) {
  var password = "";
  // keep appending random characters from our list until our password length is reached
  for (i = 0; i < passwordInfo.characterLength; i++) {
    // generate a random number between 0 and length of our character options
    // use this number to index a character from our list
    var randomIndex = Math.floor(Math.random()*characters.length);
    var randomCharacter = characters.charAt(randomIndex);
    // append this character to our password
    password = password + randomCharacter;
  };

  var verified = verifyPassword(passwordInfo, password);

  if (!verified) {
    return buildPassword(passwordInfo, characters);
  }

  return password;
};

// verify that each character type the user wanted is in our generated password. If not, generate a new one
function verifyPassword (passwordInfo, password) {
  // if password criteria includes lowercase, check the password for a lowercase letter
  if (passwordInfo.characterTypes.lowercase) {
    var lowercaseCheck = false;
    for (i = 0; i < password.length; i++) {
      if (lowercaseOptions.includes(password[i])) {
        lowercaseCheck = true;
        // don't need to check the rest of the characters if lowercase is found
        break;
      }
    }
    if (!lowercaseCheck) {
      return false;
    }
  }

  // if password criteria includes uppercase, check the password for a uppercase letter
  if (passwordInfo.characterTypes.uppercase) {
    var uppercaseCheck = false;
    for (i = 0; i < password.length; i++) {
      if (uppercaseOptions.includes(password[i])) {
        uppercaseCheck = true;
        break;
      }
    }
    if (!uppercaseCheck) {
      return false;
    }
  }

  // if password criteria includes numeric characters, check for a number in the password
  if (passwordInfo.characterTypes.numeric) {
    var numericCheck = false;
    for (i = 0; i < password.length; i++) {
      if (parseInt(password[i])) {
        numericCheck = true;
        break;
      }
    }
    if (!numericCheck) {
      return false;
    }
  }


  if (passwordInfo.characterTypes.special) {
    var specialCheck = false;
    for (i = 0; i < password.length; i++) {
      if (specialOptions.includes(password[i])) {
        specialCheck = true;
        break;
      }
    }
    if (!specialCheck) {
      return false;
    }
  }

  // if we made it through all the checks, return true
  return true;
};

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

};

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
