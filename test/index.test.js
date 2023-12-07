
const app = require('../src/app');
const session = require('supertest');
const request = session(app);


const character =  {   //objeto qeu se recorre para el test
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
       name: 'Earth (C-137)',
       url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
 }


describe ("test de Rutas", ()=>{
    describe ("GET /rickandmorty/character/:id", ()=>{
        it ("responde con status: 200", async()=>{
            const response = await request.get('/rickandmorty/characters/1');   //peticion al server no
            expect (response.statusCode).toBe(200)

        })

        it ("responde un objeto con las propiedades: id, name, species, gender, status, origin e iamge", 
            async()=>{
                const response = await request.get('/rickandmorty/characters/1')

                for(const prop in character){
                    expect(response.body).toHaveProperty(prop) 
                }

            } );
        
        
        it ("Si hay un error responde con status: 500", 
            async() =>{
                const response = await request.get('/rickandmorty/characters/1as')
                expect (response.statusCode).toBe(500)
            })
    })

    describe ("GET /rickandmorty/login", ()=>{
        it ("responde con un objeto con la propiedad access en true si la info del user es valida", async()=>{
            const response = await request.get('/rickandmorty/login?email=diego@gmail.com&password=123456');   
            const access = {access: true}
            expect (response.body).toEqual(access)

        })
        it ("responde con un objeto con la propiedad access en true si la info del user es valida", async()=>{
            const response = await request.get('/rickandmorty/login?email=diego@gmail.com&password=12345asd6');   
            const access = {access: false}
            expect (response.body).toEqual(access)
            
        })
    })

    describe ("POST /rickandmorty/fav", ()=>{
        it ("Debe guardar el personaje en favoritos", async()=>{
            const response = await request.post('/rickandmorty/fav')
                .send(character)
                expect(response.body).toContainEqual(character)   
            
        })

        it ("Debe agregar personajes a favoritos", async()=>{
            character.id = 1923
            const response = await request.post('/rickandmorty/fav')
                .send(character)
                expect(response.body.length).toBe(2)
            
        })

    })

    describe ("DELETE /rickandmorty/fav/:id", ()=>{
        it ("Si el id solicitado no existe, deberia retornar un arreglo con todos los favoritos", async()=>{
            const response = await request.delete('/rickandmorty/fav/2asd')
                .send(character)
                expect(response.body.length).toBe(2)
            
        })
        it ("Si el id solicitado existe, deberia eliminarlo de favoritos", async()=>{
            const response = await request.delete('/rickandmorty/fav/1')
                .send(character)
                expect(response.body.length).toBe(1)
            
        })

    })
})