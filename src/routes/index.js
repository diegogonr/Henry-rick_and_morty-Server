
const {login} = require('../controllers/login')
const {getCharById, getAllCharacters, getAllFavorites} =require('../controllers/getCharById')
const {postFav, deleteFav} = require('../controllers/handleFavorites')

const express = require('express')
const router = express.Router()

router.get('/characters/:id', (req, res) =>{
    getCharById(req, res)
})

router.get('/characters/fav', async(req, res) =>{
    try {
        const allFavorites = await getAllFavorites(req,res)
        console.log(allFavorites)
        if (allFavorites.error)  throw new Error(allFavorites.error)
    
        res.status(200).json(allFavorites); 

    } catch (error) {
        return res.status(400).send(error.message);
    }
})


router.get('/login', (req, res) =>{
    login(req, res)

})

router.post('/fav', async (req, res) =>{
    try {
        const characterFav = await postFav(req,res)
        console.log(characterFav)
        if (characterFav.error)  throw new Error(characterFav.error)
    
        res.status(200).json(characterFav); 

    } catch (error) {
        return res.status(400).send(error.message);
    }

})

router.delete('/fav/:id', async(req, res) =>{
    try {
        const favoriteFinded = await deleteFav(req,res)
        if (favoriteFinded.error)  throw new Error(favoriteFinded.error)
    
        res.status(200).send(favoriteFinded); 

    } catch (error) {
        return res.status(400).send(error.message);
    }})

router.get ('/allCharacters', async (req, res) =>{
    getAllCharacters(req, res)
})


module.exports = router;




