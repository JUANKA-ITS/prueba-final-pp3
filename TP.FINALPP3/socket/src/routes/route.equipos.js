const express = require('express');
const router = express.Router();
const db = require('../database');
const inet = require("inet");

// Listar equipos 
router.get('/equipo', async(req, res) => {

    await db.query('select id_host, hostname, inet_ntoa(dir_ip) as dir_ip, fecha_carga, cliente from equipos ', (err, rows) => {
 
    if (!err) {
         res.json(rows);
    } else {
        res.json('No se han detectaron equipos registrados');
    }
 });
});

/* Eliminar un equipo*/
router.delete('/equipo/:uneq', async(req, res) => {
 
    let id = req.params.uneq;
    const respuesta = await db.query('delete from equipo where id_host = ?', [id]);

    res.json('trabajo'); /* Ver con delfor */
});

/* Almacenar un equipo */
router.post('/equipo', async(req, res) => {
 
    let unEquipo = {
 
        hostname: req.body.hostname,
        dir_ip: inet.aton(req.body.dir_ip),
        fecha_carga: req.body.fecha_carga,
        cliente: req.body.cliente
 }
 const respuesta = await db.query('insert into equipos set ?', [unEquipo]);
 
 res.json('respuesta'); /* Ver con delfor */
});

/* Actualizar un equipo */
router.put('/equipo/:actEq', async(req, res) => {
 
    let id = req.params.actEq;
    let unEquipo = {
 
        hostname: req.body.hostname,
        dir_ip: inet.aton(req.body.dir_ip),
        fecha_carga: req.body.fecha_carga,
        cliente: req.body.cliente
 }
 const respuesta = await db.query('update equipos set ? where id_host = ?',
[unEquipo, id]);
 res.json('respuesta');
});

/* busqueda especifica por equipo */
router.get('/equipo/:eqbusq', async(req, res) => {
 
    let id = req.params.eqbusq;
    await db.query('select id_host,hostname,inet_ntoa(dir_ip),fecha_carga,cliente from equipos where id_host = ?', [id], (err, rows) => {
 
        if (!err) {
             res.json(rows);
        } else {
           res.json('No se puedo encontrar ningun equipo asociado.');
        }
    });
 }),
 
 module.exports = router;