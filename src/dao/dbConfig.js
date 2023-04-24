import mongoose from 'mongoose';
import config from '../config/config.js';



console.log('el mongo url es: ' + config.mongoUrl)
const URI = config.mongoUrl;

// try {
//     await mongoose.connect(URI);
//     console.log('Conectado a BDD');
// } catch (error) {
//     console.log(error);
// }
try {
    await mongoose.connect('mongodb+srv://lautaronarizzano:QZoTw0N0bZ1xU1Te@codercluster.2kusi8q.mongodb.net/?retryWrites=true&w=majority');
    console.log('Conectado a BDD');
} catch (error) {
    console.log(error);
}