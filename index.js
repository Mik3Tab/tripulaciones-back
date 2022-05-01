const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

const { dbConnection } = require("./database/config");
const { typeError }= require('./middlewares/errors');
const swaggerUI = require('swagger-ui-express');
const docs = require('./docs/index');


const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs));


dbConnection();

app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comments", require("./routes/comments"));
app.use("/companies", require("./routes/companies"));
app.use("/challenges", require("./routes/challenges"));

app.use(typeError)

app.listen(PORT, () => console.log(`Servidor levantado en el puerto ${PORT}`));