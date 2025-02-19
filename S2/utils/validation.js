const validator = require('validator');

const validateFormData = (user) => {
  // console.log('This is the body', body);
  const { firstName, emailId, password, gender } = user.body;

  if (!firstName) {
    throw new Error('Name is not correct');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Email is not valid');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('Password should contain min 8 letters,Uppercase,Lowercase,Special character');
  }
};

const validateEditFormData = (user) => {
  const allowedFields = [
    'firstName',
    'lastName',
    'age',
    'gender',
    'photoUrl',
    'emailId',
    'about',
    'skills',
  ];
  const isAllowed = Object.keys(user.body).every((field) => allowedFields.includes(field));
  return isAllowed;
};

module.exports = { validateFormData, validateEditFormData };
