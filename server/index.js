const express = require('express');
const app =  express();
const mysql = require('mysql');
const cors = require('cors');

const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(cors());
app.use(express.json());
// npm install axios, express, mysql
// npm install cors
// npm install react-router-dom
// Se crea conexión
const urlDB =  `mysql://root:EyiDmGNrajKDGOcqQvIyTTeKrvotKyCJ@viaduct.proxy.rlwy.net:31718/railway`

const db = mysql.createConnection(urlDB
    // {
    // host: process.env.DB_HOST || "localhost",
    // user: process.env.DB_USER || "root",
    // password: process.env.DB_PASSWORD || "root123",
    // database: process.env.DB_NAME || "usuarios_crud"
// }
);
// Guardar en la base de datos
app.post("/create",(req,res) =>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    db.query('INSERT INTO usuarios(nombre, edad, pais, cargo, anios) VALUES (?,?,?,?,?)',[nombre,edad, pais, cargo, anios],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    

    });    
});
//obtener datos de la base de datos
app.get("/usuarios",(req,res) =>{
    
    db.query('SELECT * FROM usuarios',
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    

    });    
});
// actualizar datos de la base de datos
app.put("/update",(req,res) =>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    db.query('UPDATE usuarios SET nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id =?',[nombre,edad, pais, cargo, anios,id],
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    

    });    
});
app.delete("/delete/:id",(req,res) =>{
    const id = req.params.id;
    
    
    db.query('DELETE FROM usuarios WHERE id =?',id,
    (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    

    });    
});



app.listen(port, () =>{
    console.log("Corriendo en el puerto 3001")
})