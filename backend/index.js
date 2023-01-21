const connectToMongo = require("./db");
const express = require("express");
const cors = require('cors')
connectToMongo();

const app = express();

const port = 5000;

app.use(cors());
//it's a middleware function which parsed json and puts in req.body 
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use('/api/notes', require('./routes/note'))

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
