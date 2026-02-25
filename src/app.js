import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRoutes.js';

const app = express();
const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

//Mongo 
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => console.log('Mongo Conectado'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Servidor escuchando http://localhost:${PORT}`);
});

