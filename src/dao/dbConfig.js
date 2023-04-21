import mongoose from 'mongoose';
import config from '../config/config.js';



// console.log('el mongo url es: ' + config.port)
const URI = config.mongoUrl;

try {
    await mongoose.connect(URI);
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
}