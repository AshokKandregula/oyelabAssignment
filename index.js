const express = require("express");
const app = express();
app.use(express.json());

const customerDetails = [];

app.post("/customer/details", (request, response) => {
  const data = request.body;
  const { name, phoneNo } = data;

  const duplicateCustomer = customerDetails.find(
    (customer) => customer.phoneNo === phoneNo
  );

  if (duplicateCustomer === undefined) {
    response.status(200).send("New customer Added");

    customerDetails.push(data);
    console.log(customerDetails);
  } else {
    response.status(400).send("phone Number already registred");
  }
});
app.listen(3000, () => {
  console.log("Server Running at http://localhost:3000/");
});
