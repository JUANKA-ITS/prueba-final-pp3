//se guarda en una constante todo lo que express ofrese
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');


var osu = require('node-os-utils')
var cpu = osu.cpu;
var mem = osu.mem;
var netstat = osu.netstat;
var drive = osu.drive;

//inicializa y guarda las funcionalidades de express
const server = express();

//se setea el puerto disponible en el sistema
server.set('port', process.env.PORT || 3030);

//formato de datos para la recepcion y uso de datos seran en json
server.use(express.json());
server.use(cors());

//nuestras rutas
//server.use(require('./routes/route.equipos'));
//server.use(require('./routes/route.clientes'));

//le damos arranque al servidor
const servidor = server.listen(server.get('port'));

//muestra la ejecucion del server
console.log('servidor corriendo en el puerto', server.get('port'));

//websocket require de un servidor para trabajar
const socket = socketio(servidor);

socket.on('connection',(socket) => {

    setInterval(() => {

        cpu.free().then(info => {

            socket.emit('cpu', info)

        });

        mem.info().then(info => {

            socket.emit('ram', info)
        });

        netstat.stats().then(info => {

            socket.emit('red', info)
         
        });

        drive.info().then(info => {

            socket.emit('hdd', info)
        });


    }, 1000);
});