
const axios = require('axios');
const {Character} = require('../DB_connection')

const getApiData = async () =>{
    try {

        let i =1;
        let characters = []

        while(i<6) {
            let apiData = await axios (`https://rickandmortyapi.com/api/character?page=${i}`)
            characters.push(apiData);
            i++;
        }

        characters = (await Promise.all(characters)) //[promesa1, promesa2, promesa3 ....]
        .map(res => res.data.
            results.map (char => {
                return ({
                    id:char.id,
                    name:char.name,
                    status:char.status,
                    species:char.species,
                    gender:char.gender,
                    origin:char.origin.name,
                    image: char.image
                })
            }))

     let allCharacters = [];
     characters.map (char => {allCharacters = allCharacters.concat(char)})
    
     return allCharacters;

    } catch (error) {
        return {error: error.message}
    }

}

//?? GUARDA LOS 100 PERSONAJES EN LA BASE DE DATOS 
const saveApiData = async() =>{
    try {
        const allCharacters = await getApiData()
        await Character.bulkCreate(allCharacters) 
        //bulkCreate => metodo de sequlize que permite pasar un array de objetos y los crea juntos en la DB

        return allCharacters

    } catch (error) {
        return {error: error.message}

    }  

}



module.exports = {
    saveApiData
 };
 


