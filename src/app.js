import express from 'express';
import { engine } from 'express-handlebars';
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/dbConnection.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRoutes.js';
import viewsRouter from "./routes/viewsRouter.js";

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//Routes
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/", viewsRouter);

//Middleware de error
app.use(errorHandler);

// Mongo + Server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al iniciar la aplicación:", error);
    });

