// Import the Express library, and create an instance of it (in the app variable)
const { json } = require('express');
const express = require('express'); 
const app = express(); 

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// Home page request
app.get('/', (req, res) => {        
  res.send("Welcome to our server!! this one");
}); 

// Start an instance of our Express server, listening on port 3000
app.listen(PORT, HOST, () => { 
  console.log(`Server is running on http://${HOST}:${PORT}`); 
}); 

const performOperation = (operation) => {
    const calculator = (n1, n2) => {
      switch (operation) {
        case "/add":
          return n1 + n2;
        case "/subtract":
          return n1 - n2;
        case "/multiply":
          return n1 * n2;
        case "/divide":
          return n1 / n2;
        default:
          throw new Error(`Unknown operation: ${operation}`);
      }
    };
    return (req, res) => {
      try {
        
        if (req.query.n1 === undefined) {
            console.log("Error missing n1");
            res.status(400).send(`Error: failed to receive parameter n1!`);
          }
          if (req.query.n2 === undefined) {
            console.log("Error missing n2");
            res.status(400).send(`Error: failed to receive parameter n2!`);
          }
      
          // Validate received parameters
          if (req.query.n1 === '') {
            res.status(400).send(`Error: n1 field left empty`);
            throw new Error("incorrect value");
          }
          // Validate received parameters
          if (req.query.n2 === '') {
            res.status(400).send(`Error: n2 field left empty`);
            throw new Error("incorrect value");
          }

        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
  
    // Validate received parameters
    if (isNaN(n1)) {
        res.status(400).send(`Error: Received n1 value of '${req.query.n1}' is not a number!`);
        throw new Error("incorrect value");
      }    
  
      // Validate received parameters
      if (isNaN(n2)) {
        res.status(400).send(`Error: Received n2 value of '${req.query.n2}' is not a number!`);
        throw new Error("incorrect value");
      }
        const result = calculator(n1, n2);
        res.status(200).send(`${n1} ${operation.slice(1)} ${n2} is ${result}`);
      } catch (error) {
      }
    };
};

app.get("/add", performOperation("/add"));
app.get("/subtract", performOperation("/subtract"));
app.get("/multiply", performOperation("/multiply"));
app.get("/divide", performOperation("/divide"));