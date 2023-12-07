require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const characteModel = require('./models/Character')
const favoriteModel = require('./models/Favorite')

// EJERCICIO 03
// A la instancia de Sequelize le falta la URL de conexión. ¡Agrégala!
// Recuerda pasarle la información de tu archivo '.env'.

// URL ----> postgres://DB_USER:DB_PASSWORD@DB_HOST/rickandmorty
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/rickandmorty`,
   // URL
   { logging: false, native: false }
);

// EJERCICIO 05
// Debajo de este comentario puedes ejecutar la función de los modelos.

characteModel(sequelize)
favoriteModel(sequelize)



// Ejercicio 06
// ¡Relaciona tus modelos aquí abajo!
// const { User, Favorite } = sequelize.models;


module.exports = {
   ...sequelize.models, //acá esta dentro el modelo Character que se usa en saveApiData
   
   sequelize
};
