const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("student.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE customers (
      customerId INTEGER PRIMARY KEY,
      name TEXT,
      email TEXT
    )
  `);

  db.run(
    "INSERT INTO customers (customerId, name, email) VALUES (1, 'ravi', 'ravi123@gmail.com')"
  );
  db.run(
    "INSERT INTO customers (customerId, name, email) VALUES (2, 'kishan', 'kishan11@gmail.com')"
  );
  db.run(
    "INSERT INTO customers (customerId, name, email) VALUES (3, 'sameer', 'sameer44@gmail.com')"
  );
});
db.serialize(() => {
  db.run(`
    CREATE TABLE subjects (
      subjectId INTEGER PRIMARY KEY,
      subjectName TEXT
    )
  `);

  db.run("INSERT INTO subjects (subjectId, subjectName) VALUES (1, 'English')");
  db.run("INSERT INTO subjects (subjectId, subjectName) VALUES (2, 'Hindi')");
  db.run("INSERT INTO subjects (subjectId, subjectName) VALUES (3, 'Maths')");
});
db.serialize(() => {
  db.run(`
    CREATE TABLE mapping (
      mappingId INTEGER PRIMARY KEY,
      customerId INTEGER,
      subjectId INTEGER,
      FOREIGN KEY (customerId) REFERENCES customers (customerId),
      FOREIGN KEY (subjectId) REFERENCES subjects (subjectId)
    )
  `);

  db.run(
    "INSERT INTO mapping (mappingId, customerId, subjectId) VALUES (1, 1, 1)"
  );
  db.run(
    "INSERT INTO mapping (mappingId, customerId, subjectId) VALUES (2, 1, 2)"
  );
  db.run(
    "INSERT INTO mapping (mappingId, customerId, subjectId) VALUES (3, 1, 3)"
  );
  db.run(
    "INSERT INTO mapping (mappingId, customerId, subjectId) VALUES (4, 2, 1)"
  );
  db.run(
    "INSERT INTO mapping (mappingId, customerId, subjectId) VALUES (5, 3, 3)"
  );
});
const query = `
  SELECT c.customerId, c.name, GROUP_CONCAT(s.subjectName, ',') AS subjects
  FROM customers as c
  JOIN mapping as m ON c.customerId = m.customerId
  JOIN subjects as  s ON m.subjectId = s.subjectId
  GROUP BY c.customerId, c.name
  ORDER BY c.customerId ASC
`;

db.all(query, [], (err, rows) => {
  if (err) {
    console.error(err);
  } else {
    console.log(" name subjects");

    rows.forEach((row) => {
      console.log(`${row.customerId} ${row.name} ${row.subjects}`);
    });
  }
  db.close();
});
