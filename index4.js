const person = {
  id: 2,
  gender: "mail",
};

const student = {
  name: "ravi",
  email: "ravi11@yopmail.com",
};

const combineObj = {
  ...person,
  ...student,
};

console.log(combineObj);
