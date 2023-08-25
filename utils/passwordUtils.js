const bcrypt = require("bcrypt"); // This file is not used currently

const comparePasswords = (inputPassword, hashedPassword) => {
  inputPassword = inputPassword.trim();
  hashedPassword = hashedPassword.trim();

  console.log("Input Password:", inputPassword);
  console.log("Hashed Password from DB:", hashedPassword);

  const passwordMatch = bcrypt.compareSync(inputPassword, hashedPassword);

  console.log("Password Match:", passwordMatch);

  return passwordMatch;
};


module.exports = {
  comparePasswords,
};
