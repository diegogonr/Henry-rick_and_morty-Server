

const server= require('./app')
const PORT = 3001;


const {sequelize} = require('./DB_connection')
const {saveApiData} = require('./controllers/saveApiData')



sequelize.sync ({force: true}).then (async() => {
    console.log("DB connection established")
    await saveApiData();
    server.listen(PORT, ()=>{
        console.log(`Server listening on ${PORT}`)
    })
})
