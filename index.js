require('dotenv').config();
const express = require('express');
const myRoutes = require('./src/routes/routes-config');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(express.json());
app.use(cors())
//dynamic routes
app.use('/api',myRoutes)

//default route for api
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});


//server listening
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
