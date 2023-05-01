const ERRORS = {
  username: 'username',
  password: 'password',
  businessName: 'businessName',
  businessAddress: 'businessAddress',
};

/**
 * Validate all the fields have in options object
 * => Return appropriate error when error
 * => Return 'valid' when all the fields are valid
 * Available fields: username, password, businessName, businessAddress
 * @param {object} options Ex: {name:"abc", password:"123"}
 */
function validator(options) {
  // Username validator
  if (options?.username) {
    if (!isValidUserName(options.username)) return ERRORS.username;
  }

  // Password validator
  if (options?.password) {
    if (!isValidPassword(options.password)) return ERRORS.password;
  }

  // Bussiness name validator
  if (options?.businessName) {
    if (!isValidBusinessName(options.businessName)) return ERRORS.businessName;
  }

  // Bussiness name validator
  if (options?.businessAdress) {
    if (!isValidBusinessAddress(options.businessAdress))
      return ERRORS.businessAddress;
  }

  return 'valid';
}

function isValidUserName(username) {
  // 8 - 15 characters
  if (!(8 <= username.length && username.length <= 15)) return false;

  // Only letters and digits
  if (!isOnlyLettersAndDigits(username)) return false;

  return true;
}

function isValidPassword(password) {
  // 8 - 20 characters
  if (!(8 <= password.length && password.length <= 20)) return false;

  // Contains at least one upper case letter, at least one lower case letter,
  // at least one digit, at least one special letter in the set !@#$%^&*,
  // no other kind of characters
  let isAtLeastOneUpperCase = false;
  let isAtLeastOneLowerCase = false;
  let isAtLeastOneDigit = false;
  let isAtLeastOneSpecialCharacter = false;

  for (const c of password) {
    if (isUpperCaseLetter(c)) isAtLeastOneUpperCase = true;
    if (isLowerCaseLetter(c)) isAtLeastOneLowerCase = true;
    if (isNumber(c)) isAtLeastOneDigit = true;
    if (isSpecialCharacter(c)) isAtLeastOneSpecialCharacter = true;
  }

  if (
    !(
      isAtLeastOneUpperCase &&
      isAtLeastOneLowerCase &&
      isAtLeastOneDigit &&
      isAtLeastOneSpecialCharacter
    )
  ) {
    return false;
  }

  return true;
}

function isValidBusinessName(businessName) {
  // At least 5 characters
  if (!(businessName.length >= 5)) {
    return false;
  }

  return true;
}

function isValidBusinessAddress(businessAddress) {
  // At least 5 characters
  if (!(businessAddress.length >= 5)) return false;

  return true;
}

function isOnlyLettersAndDigits(string) {
  for (const c of string) {
    if (!(isLetter(c) || isNumber(c))) return false;
  }

  return true;
}

function isUpperCaseLetter(c) {
  return 'A' <= c && c <= 'Z';
}

function isLowerCaseLetter(c) {
  return 'a' <= c && c <= 'z';
}

function isSpecialCharacter(c) {
  const specialCharacters = '!@#$%^&*';
  return specialCharacters.includes(c);
}

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

function isNumber(c) {
  return '0' <= c && c <= '9';
}

export {
  validator,
  isValidUserName,
  isValidPassword,
  isValidBusinessName,
  isValidBusinessAddress,
};