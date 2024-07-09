import request from 'supertest';
import app from '../app';


describe('POST /agregar-categoria-Prueba de caja blanca ',()=>{
    test('deberia retornar 201 porque se agrega una nueva categoria ',async()=>{
        const nuevacategoria={
            "tipo":"Bateria",
            "valor":2,
            "puntuacion":"Cantidad"
        }

        const response = await request(app)
        .post('/agregar-categoria')
        .send(nuevacategoria);

        expect(response.status).toBe(201);
        expect(response.body.mensaje).toBe("Categoria creada");
        expect(response.body.res).toBe(true);


    })

    test('deberia retornar 400 porque la categoria ya existe ',async()=>{
        const nuevacategoria={
            "tipo":"Bateria",
            "valor":2,
            "puntuacion":"Cantidad"
        }

        const response = await request(app)
        .post('/agregar-categoria')
        .send(nuevacategoria);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("La categoria ya existe");
        expect(response.body.res).toBe(false);


    })




})





describe('POST /agregar-categoria-Prueba de caja negra ',()=>{

    test('deberia retornar 400 porque la puntuacion no es valida',async()=>{
        const nuevacategoria={
            "tipo":"Alumnio",
            "valor":2,
            "puntuacion":"aa"
        }

        const response = await request(app)
        .post('/agregar-categoria')
        .send(nuevacategoria);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("La puntuacion no esta permitida");
        expect(response.body.res).toBe(false);
    })


    test('deberia retornar 400 porque el formato es invalido',async()=>{
        const nuevacategoria={
            "tipo":123,
            "valor":2,
            "puntuacion":"aa"
        }

        const response = await request(app)
        .post('/agregar-categoria')
        .send(nuevacategoria);

        expect(response.status).toBe(400);
        expect(response.body.mensaje).toBe("Los campos estan en formato invalido");
        expect(response.body.res).toBe(false);
    })



})
