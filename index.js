require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/documentation/swagger');
const myRoutes = require('./src/routes/routes-config');
const { default: mongoose } = require('mongoose');


const app = express();


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const MONGODBURI = process.env.MONGODBURI;


app.use(express.json());
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//mongodb connection
mongoose.connect(`${MONGODBURI}`, { dbName: 'CloudAppServicesManagerDB' }).then(() => {
    console.log('-------------------------------------------------------');
    console.log("database connected");
    console.log('-------------------------------------------------------');
})


//dynamic routes
app.use('/api', myRoutes)

//default route for api
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});


//server listening
app.listen(PORT, () => {
    console.log('-------------------------------------------------------');
    console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
    console.log('-------------------------------------------------------');
    console.log('Swagger docs available at http://localhost:4500/api-docs');
});
