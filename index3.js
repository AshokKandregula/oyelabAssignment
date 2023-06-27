const sqlite3 = require("sqlite3").verbose();

const customers = [
  {
    email: "anurag11@yopmail.com",
    name: "anurag",
  },
  {
    email: "sameer11@yopmail.com",
    name: "sameer",
  },
  {
    email: "ravi11@yopmail.com",
    name: "ravi",
  },
  {
    email: "akash11@yopmail.com",
    name: "akash",
  },
  {
    email: "anjali11@yopmail.com",
    name: "anjai",
  },
  {
    email: "santosh11@yopmail.com",
    name: "santosh",
  },
];

const db = new sqlite3.Database("customer.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      customerId INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE
    )
  `);
});

customers.forEach((customer) => {
  const { email, name } = customer;

  db.get(
    `SELECT customerId FROM customers WHERE email = ?`,
    [email],
    (err, row) => {
      if (err) throw err;

      if (row) {
        const customerId = row.customerId;
        db.run(
          "UPDATE customers SET name = ? WHERE customerId = ?",
          [name, customerId],
          (err) => {
            if (err) throw err;
            console.log(`Updated customer with email ${email}`);
          }
        );
      } else {
        db.run(
          "INSERT INTO customers (name, email) VALUES (?, ?)",
          [name, email],
          (err) => {
            if (err) throw err;
            console.log(`Inserted customer with email ${email}`);
          }
        );
      }
    }
  );
});

db.close((err) => {
  if (err) throw err;
  console.log("Disconnected from the SQLite database");
});
