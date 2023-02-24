import express from 'express';
import bodyParser from 'body-parser';
import {  dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {connectDB} from './database/databaseConnection.js';
import chalk from 'chalk';


//Importando las rutas de los eventos:
import eventRoutes from './routes/eventRoutes.js';

//Archivo de configuración:
import config from "./config.js";

const app = express();

//Definir la ruta de las vistas:
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views',join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/events',eventRoutes);

app.get('/', (req,res) => res.render("index"));


const PORT = config.SERVER.SETTINGS.PORT || 3002
app.listen(PORT);
console.log(chalk.green("****************************"));
console.log(chalk.green("  Servidor en puerto " + PORT));
console.log(chalk.green("****************************"));

//Conexión a la base de datos:
connectDB(config.DB.MONGODB.URL)