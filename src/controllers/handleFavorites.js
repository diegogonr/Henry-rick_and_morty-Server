
const {Favorite} = require('../DB_connection')

// ** CON DB */

const postFav = async (req,res)=>{
    try {
        const {name, status, species, gender, origin, image} = req.body;
        if(!name || !status || !species || !gender || !origin || !image) {
            throw new Error('Invalid datos obligatorios')
        }
        const newFav= {name, status, species, gender, origin, image}
        console.log(newFav);

        await Favorite.create(newFav);
        return newFav

    } catch (error) {
        return {error: error.message};
    }

}


//**** SIN DB */
// let myFavorites = [];

// const postFav = (req,res)=>{
//     const character = req.body;

//     const characterFound= myFavorites.find(fav=>fav.id==character.id)
//     if (!characterFound) {
//         myFavorites.push(character);
    
//         return res.status(200).json(myFavorites); //
//     }
//     return res.status(400).json("Pesonaje repetido");

// }


// ** CON DB */

const deleteFav = async (req, res) => { 
    try {
        const {id} = req.params

        const favoriteFinded = await Favorite.findByPk(parseInt(id));
        if (!favoriteFinded)  throw new Error("no existe ese favorite");
        
        await favoriteFinded.destroy();

        return "favorito eliminado correctamente";

    } catch (error) {
        return {error: error.message};

    }

}


//**** SIN DB */

// const deleteFav = (req, res) => { 
//     const {id} = req.params
//     myFavorites = myFavorites.filter(favorite => favorite.id != +id); 

//     return res.status(200).json(myFavorites);

// }

module.exports = {
    postFav,
    deleteFav
};

