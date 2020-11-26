//se guarda en una constante todo lo que express ofrese
const express = require('express');
const cors = require('cors');

//inicializa y guarda las funcionalidades de express
const server = express();

//se setea el puerto disponible en el sistema
server.set('port', process.env.PORT || 3000);

//formato de datos para la recepcion y uso de datos seran en json
server.use(express.json());
server.use(cors());

//nuestras rutas
server.use(require('./routes/route.equipos'));
server.use(require('./routes/route.clientes'));

//le damos arranque al servidor
const servidor = server.listen(server.get('port'));

//muestra la ejecucion del server
console.log('servidor corriendo en el puerto', server.get('port'));



