
const URL = `http://rickandmortyapi.com/api/character`
const axios = require('axios')

const {Favorite} = require('../DB_connection')
const {getAllChars} = require('../controllers/getAllChars')


//* CON DB V3
const getAllFavorites = async (req, res) => {

    try {
        const allFavorites = await  Favorite.findAll();

        if (!allFavorites) throw new Error("No hay favoritos ")

        return  allFavorites
        

    } catch (error) {
        return {error: error.message}
    }
}


//* CON ASYNC V2 : YA NO SE USA PORQUE AHORA SE TRAE DESDE LA BASE DE DATOS
const getCharById = async (req, res) => {

    try {
        const {id} = req.params;
        const {data}= await axios(`${URL}/${id}`)

        if(!data.name) throw new Error(`ID: ${id} no encontrado`)    //si no hay personaje se manda un error y se pausa la ejecucion

        const character = {
            id: data.id, 
            name: data.name, 
            species: data.species, 
            origin: data.origin, 
            image:data.image, 
            gender: data.gender,  
            status:data.status
        }
        return  res.status(200).json(character);
        

    } catch (error) {
        return error.message.includes('ID')
                ?res.status(404).send (error.message)   //error del cliente por enviarme un id mal
                :res.status(500).send (error.message)   //error de axios
    }
}


//* CON PROMESAS V1

// const getCharById = (req, res )=>{

//     const {id} = req.params;

//     axios(`${URL}/${id}`)
//     .then(response => response.data)
//     .then(({status, name, species, origin, image, gender}) => {
//         if(name){
//             const character = {
//                 id, 
//                 name, 
//                 species, 
//                 origin, 
//                 image, 
//                 gender, 
//                 status
//             }
//             return  res.status(200).json(character);

//         }
//         return res.status(404).send ('Not Found');
//     })
//     .catch (error => res.status(500).send (error.message));

// }



//???????????????????????GET ALL CHARACTERS


const getAllCharacters = async (req, res) => {

    try {
        
        const allCharacters = await getAllChars();
        console.log(allCharacters)
        res.status(200).json(allCharacters)

    } catch (error) {
        return res.status(404).send('hubo un problema')
    }
}

module.exports ={
    getCharById,
    getAllCharacters,
    getAllFavorites
}